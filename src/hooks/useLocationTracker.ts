
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { getLastLocation, setLastLocation } from "../store/slices/locationSlice";
import calculateDistanceInMeters from "../utils/calculateDistance";
import webSocketService from "../sockets/orderSocket";
import { getStatus } from "../store/slices/statusSlice";

const useLocationTracker = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(getStatus);
  const lastLocation = useAppSelector(getLastLocation);

  const statusRef = useRef(status);
  const lastLocationRef = useRef(lastLocation);
  const socketRef = useRef<any>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // update ref when last location and status changes
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    lastLocationRef.current = lastLocation;
  }, [lastLocation]);

  useEffect(() => {
    // track location only when partner is online and offline
    const shouldTrack = status === "ONLINE" || status === "OCCUPIED";
    
    if (!shouldTrack) {
      // cleanup when user goes offline
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        // console.log("Location tracking stopped - user offline");
      }
      
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        // console.log("Socket disconnected - user offline");
      }
      
      return;
    }

    // initialize socket if not connected
    if (!socketRef.current) {
      socketRef.current = webSocketService(dispatch);
      socketRef.current.connect();
      // console.log("Location socket connected");
    }

    // check if geolocation is supported
    if (!navigator.geolocation) {
      // console.error("Geolocation is not supported by this browser");
      return;
    }

    // starting location tracking interval if not running
    if (!intervalIdRef.current) {
      let prevLat: number | null = null;
      let prevLng: number | null = null;

      intervalIdRef.current = setInterval(() => {
        // checking current status before making location request
        const currentStatus = statusRef.current;
        if (currentStatus !== "ONLINE" && currentStatus !== "OCCUPIED") {
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const currentLocation = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };

            // console.log("Current location:", currentLocation);

            // first time setup
            if (prevLat === null || prevLng === null) {
              prevLat = currentLocation.lat;
              prevLng = currentLocation.lng;
              dispatch(setLastLocation(currentLocation));
              return;
            }

            // calculating distance
            const distance = calculateDistanceInMeters(
              prevLng,
              prevLat,
              currentLocation.lng,
              currentLocation.lat,
            );

            // console.log("Distance moved:", distance, "meters");

            if (distance >= 1) {
              prevLat = currentLocation.lat;
              prevLng = currentLocation.lng;
              
              dispatch(setLastLocation(currentLocation));

              // Send location update based on current status
              if (currentStatus === "OCCUPIED") {
                socketRef.current?.handleOccupiedLocationUpdate(currentLocation);
              } else if (currentStatus === "ONLINE") {
                socketRef.current?.handleAvailableLocationUpdate(currentLocation);
              }
            }
          },
          (error) => {
            console.error("Error getting location:", error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      }, 5000);

      // console.log("Location tracking started");
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [status, dispatch]);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);
};

export default useLocationTracker;

