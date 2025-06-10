import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { updatePersonalInfo, updateVehicleDetails, updateDocuments } from '../../store/signupSlice';
import { useWatch } from 'react-hook-form';

// List of Indian states for dropdown
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh","Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// Define schema using Zod
const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  dob: z.string().refine((val)=>{
    const dob=new Date(val);
    const today=new Date();
    const ageDiff=today.getFullYear()-dob.getFullYear();
    const m=today.getMonth()-dob.getMonth();
    const dayDiff=today.getDate()-dob.getDate();

    const isAtLeast18= ageDiff>18 || (ageDiff ===18 && (m>0 || (m===0 && dayDiff>=0)));
    return isAtLeast18;
  },{
    message:"You must be at least 18 years old."
  }),
  password: z.string().regex(passwordRegex,"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
  confirmPassword: z.string(),
  permanentAddress: z.string().min(5),
  pincode: z.string().regex(/^\d{6}$/),
  state: z.enum(indianStates as [string, ...string[]]),
  vehicleType: z.enum(['Scooter', 'Bike', 'Bicycle']),
  vehicleColor: z.string().optional(),
  vehicleNumber: z.string().optional(),
  aadhaarNumber: z.string().regex(/^\d{12}$/, 'Invalid Aadhaar'),
  dlNumber: z.string().optional(),
  rcNumber: z.string().optional(),
  profilePic: z.string().optional(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => {
    if (data.vehicleType === 'Bicycle') return true;
    return !!data.dlNumber && !!data.rcNumber && !!data.vehicleNumber;
  }, {
    message: "DL, RC, and Vehicle Number required for Scooter/Bike",
    path: ["dlNumber"],
  });

type FormSchema = z.infer<typeof formSchema>;

export default function Step3ProfileForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit,control, watch, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });

  const passwordsMatch = password === confirmPassword;
  const isStrongPassword=passwordRegex.test(password || "");
  const vehicleType = watch('vehicleType');

  // Form submission handler
  const onSubmit = (data: FormSchema) => {
    console.log("submitting")
    // Dispatch personal info
    dispatch(updatePersonalInfo({
      name: data.name,
      email: data.email,
      dob: data.dob,
      password: data.password,
      confirmPassword: data.confirmPassword,
      permanentAddress: data.permanentAddress,
      pincode: data.pincode,
      state: data.state,
    }));

    // Dispatch vehicle info
    dispatch(updateVehicleDetails({
      vehicleType: data.vehicleType,
      vehicleColor: data.vehicleColor,
      vehicleNumber: data.vehicleType !== 'Bicycle' ? data.vehicleNumber : '',
    }));

    // Dispatch documents
    dispatch(updateDocuments({
      aadhaar: data.aadhaarNumber,
      dl: data.vehicleType !== 'Bicycle' ? data.dlNumber : '',
      rc: data.vehicleType !== 'Bicycle' ? data.rcNumber : '',
      profilePic: data.profilePic || '',
    }));

    console.log("🚀 Final submission payload", data);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl animate-fadeIn space-y-8">
      <h2 className="text-3xl font-bold text-center text-red-700">Step 3: Profile Information</h2>

      {/* Personal Info */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input {...register('name')} className="w-full p-2 border rounded" placeholder="Full Name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input {...register('email')} type="email" className="w-full p-2 border rounded" placeholder="Email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input {...register('dob')} type="date" max={new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded" />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input {...register('password')} type="password" className="w-full p-2 border rounded" placeholder="Password" />
            {!isStrongPassword && password && <p className="text-yellow-500 text-sm">Password must be strong</p>}
            {isStrongPassword && <p className="text-green-600 text-sm">Strong password ✅</p>}
          </div>
          <div>
            <label className="block font-medium">Confirm Password</label>
            <input {...register('confirmPassword')} type="password" className="w-full p-2 border rounded" placeholder="Confirm Password" />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            {confirmPassword && !passwordsMatch && !errors.confirmPassword && <p className="text-yellow-500 text-sm">Passwords do not match</p>}
            {confirmPassword && passwordsMatch && !errors.confirmPassword && <p className="text-green-600 text-sm">Passwords match</p>}
          </div>
          <div>
            <label className="block font-medium">Permanent Address</label>
            <input {...register('permanentAddress')} className="w-full p-2 border rounded" placeholder="Address" />
          </div>
          <div>
            <label className="block font-medium">Pincode</label>
            <input {...register('pincode')} className="w-full p-2 border rounded" placeholder="6-digit Pincode" />
          </div>
          <div>
            <label className="block font-medium">State</label>
            <select {...register('state')} className="w-full p-2 border rounded">
              <option value="">Select State</option>
              {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Vehicle Info */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Vehicle Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Vehicle Type</label>
            <select {...register('vehicleType')} className="w-full p-2 border rounded">
              <option value="">Select Vehicle Type</option>
              <option value="Scooter">Scooter</option>
              <option value="Bike">Bike</option>
              <option value="Bicycle">Bicycle</option>
            </select>
          </div>
          {vehicleType !== 'Bicycle' && (
            <>
              <div>
                <label className="block font-medium">Vehicle Number</label>
                <input {...register('vehicleNumber')} className="w-full p-2 border rounded" placeholder="Vehicle Number" />
              </div>
              <div>
                <label className="block font-medium">Driving License Number</label>
                <input {...register('dlNumber')} className="w-full p-2 border rounded" placeholder="DL Number" />
                {errors.dlNumber && <p className="text-red-500 text-sm">{errors.dlNumber.message}</p>}
              </div>
              <div>
                <label className="block font-medium">RC Number</label>
                <input {...register('rcNumber')} className="w-full p-2 border rounded" placeholder="RC Number" />
              </div>
            </>
          )}
          <div>
            <label className="block font-medium">Vehicle Color</label>
            <input {...register('vehicleColor')} className="w-full p-2 border rounded" placeholder="Color (Optional)" />
          </div>
          <div>
            <label className="block font-medium">Aadhaar Number</label>
            <input {...register('aadhaarNumber')} className="w-full p-2 border rounded" placeholder="12-digit Aadhaar" />
            {errors.aadhaarNumber && <p className="text-red-500 text-sm">{errors.aadhaarNumber.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Profile Picture URL</label>
            <input {...register('profilePic')} className="w-full p-2 border rounded" placeholder="Image URL (Optional)" />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div>
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg shadow-md transition-all duration-300">
          Submit
        </button>
      </div>
    </form>
  </div>
  );
}
