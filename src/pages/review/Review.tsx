// // import React, { useState } from "react";
// // import { reviewsData, type Review } from "../../data/review";

// // export default function Review() {

// //     const [reviews,setReviews]=useState<Review[]>(reviewsData);

// //     const handleSorting=(rating:number)=>{
// //         const sortedData=reviewsData.filter((review)=>review.rating>=rating);
// //         setReviews(sortedData);
// //     }

// //   return (
// //     <div>
// //       <h1>Reviews</h1>
// //       <div>
// //         <button onClick={()=>handleSorting(1)}>1</button>
// //         <button onClick={()=>handleSorting(2)}>2</button>
// //         <button onClick={()=>handleSorting(3)}>3</button>
// //         <button onClick={()=>handleSorting(4)}>4</button>
// //         <button onClick={()=>handleSorting(5)}>5</button>
// //         <button onClick={()=>handleSorting(0)}>Clear Filters</button>
// //       </div>
// //       {reviews.map((review) => {
// //         return (
// //           <div>
// //             <div>{review.id}</div>
// //             <div>{review.rating}</div>
// //             <div>{review.feedback}</div>
// //             <div>{review.tags}</div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { reviewsData, type Review } from "../../data/review";
// import { Star } from "lucide-react";
// import axios from "axios";

// export default function Review() {
//   const [reviews, setReviews] = useState<Review[]>(reviewsData);
//   const [suggestions,setSuggestions]=useState("");

//   const GeminiUrl=import.meta.env.VITE_GEMINI_URL;

//   const handleSorting = (rating: number) => {
//     if (rating === 0) {
//       setReviews(reviewsData);
//     } else {
//       const sortedData = reviewsData.filter((review) => review.rating >= rating);
//       setReviews(sortedData);
//     }
//   };

//   const prompt=`
//    These are the reviews given to our food delivery partner
//    ${reviewsData.map((ele,i)=>`
//       ${i+1}. Rating: ${ele.rating}. Feedback:${ele.feedback} tags:${ele.tags.join("")}
//    `).join("/n")}

//    Please summarize the feedback and provide a  very short summary to delivery partner  with the most used sentiment tags.

//   `;

//     const payload = {
//     contents: [
//       {
//         parts: [
//           {
//             text: prompt,
//           },
//         ],
//       },
//     ],
//   };

//   const generateSuggestions=async()=>{

//     const response=await axios.post(`${GeminiUrl}`,payload,{
//         headers:{
//             "Content-Type":"application/json",
//         }
//     });

//     console.log(response);
//   }

//   const renderStars = (rating: number) => {
//     return (
//       <div className="flex text-yellow-500">
//         {Array.from({ length: 5 }, (_, i) => (
//           <Star
//             key={i}
//             size={18}
//             className={i < rating ? "fill-yellow-400" : "text-gray-300"}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">User Reviews</h1>

//       <div>{suggestions}</div>

//       <button onClick={()=>generateSuggestions()}>Generate Suggestions</button>

//       {/* Filter Buttons */}
//       <div className="flex flex-wrap justify-center gap-2 mb-6">
//         {[1, 2, 3, 4, 5].map((num) => (
//           <button
//             key={num}
//             onClick={() => handleSorting(num)}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {num}★+
//           </button>
//         ))}
//         <button
//           onClick={() => handleSorting(0)}
//           className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Review Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {reviews.map((review) => (
//           <div
//             key={review.id}
//             className="border rounded-xl p-4 shadow-md bg-white flex gap-4"
//           >
//             {/* Avatar */}
//             <img
//               src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
//               alt="Anonymous"
//               className="w-14 h-14 rounded-full object-cover"
//             />

//             {/* Review Details */}
//             <div className="flex flex-col">
//               <div className="text-lg font-semibold">Anonymous</div>
//               {renderStars(review.rating)}
//               <div className="mt-1 text-gray-700">{review.feedback}</div>
//               <div className="mt-2 flex flex-wrap gap-2 text-sm text-blue-600">
//                 {review.tags.map((tag, i) => (
//                   <span
//                     key={i}
//                     className="bg-blue-100 px-2 py-1 rounded-full"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { reviewsData, type Review } from "../../data/review";
import parseGemimiResponse from "./parser";
import { Star } from "lucide-react";
import axios from "axios";

export default function Review() {
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const [suggestions, setSuggestions] = useState<{
    summary: string;
    message: string;
    tags: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const GeminiUrl = import.meta.env.VITE_GEMINI_URL;

  const handleSorting = (rating: number) => {
    if (rating === 0) {
      setReviews(reviewsData);
    } else {
      const sortedData = reviewsData.filter(
        (review) => review.rating >= rating
      );
      setReviews(sortedData);
    }
  };

  const prompt = `
These are the reviews given to our food delivery partner:

${reviewsData
  .map(
    (ele, i) =>
      `${i + 1}. Rating: ${ele.rating}. Feedback: ${
        ele.feedback
      } Tags: ${ele.tags.join(", ")}`
  )
  .join("\n")}

Please summarize the feedback and provide a very short message to the delivery partner along with the most common sentiment tags.
`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  const generateSuggestions = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${GeminiUrl}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      

      const text =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        console.log(response);
      const parsed = parseGemimiResponse(text);
      setSuggestions(parsed);
    } catch (err) {
      setSuggestions(null);
      console.error("Gemini Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-orange-400">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? "fill-orange-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-sans bg-orange-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-orange-600">
        Delivery Partner Reviews
      </h1>

      {/* Summary Box */}
      {suggestions && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-orange-200 space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-orange-600">
              Summary of Feedback
            </h2>
          </div>

          {/* Summary */}
          {suggestions.summary && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Summary:
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {suggestions.summary}
              </p>
            </div>
          )}

          {/* Message */}
          {suggestions.message && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Message to Delivery Partner:
              </h3>
              <blockquote className="bg-orange-100 border-l-4 border-orange-400 text-orange-900 italic p-4 rounded-md">
                {suggestions.message}
              </blockquote>
            </div>
          )}

          {/* Tags */}
          {suggestions.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Most Common Sentiment Tags:
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-orange-200 text-orange-800 text-sm px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Generate Suggestions Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={generateSuggestions}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg shadow transition-all disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Suggestions"}
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => handleSorting(num)}
            className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 shadow"
          >
            {num}★+
          </button>
        ))}
        <button
          onClick={() => handleSorting(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 shadow"
        >
          Clear Filters
        </button>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-orange-200 rounded-xl p-4 shadow-sm bg-white flex gap-4"
          >
            {/* Avatar */}
            <img
              src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
              alt="Anonymous"
              className="w-14 h-14 rounded-full object-cover"
            />

            {/* Review Details */}
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-orange-600">
                Anonymous
              </div>
              {renderStars(review.rating)}
              <div className="mt-1 text-gray-800">{review.feedback}</div>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-orange-700">
                {review.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-orange-100 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
