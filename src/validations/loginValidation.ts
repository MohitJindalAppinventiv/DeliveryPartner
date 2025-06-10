import z from "zod";


export const loginschema=z.object({
    email:z.string().min(1,"Email is Required").email("Invalid email address"),
    password:z.string()
})

export type LoginFormData=z.infer<typeof loginschema>;