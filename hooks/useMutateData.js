
import { apiKit } from "@/app/lib/apiKit"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useMutateData(endpoint, method = "POST", invalidateKeys = [], isFormData = false) {
  const queryClient = useQueryClient()

  const mutationFn = async (payload) => {
    let response

    switch (method.toUpperCase()) {
      case "POST":
        response = isFormData 
          ? await apiKit.postFormData(endpoint, payload)
          : await apiKit.post(endpoint, payload)
        break
      case "PUT":
        response = await apiKit.put(endpoint, payload)
        break
      case "PATCH":
        response = await apiKit.patch(endpoint, payload)
        break
      case "DELETE":
        response = await apiKit.del(endpoint, payload)
        break
      default:
        throw new Error(`Unsupported method: ${method}`)
    }

    if (!response.success) throw new Error(`Failed to ${method} ${endpoint}`)
    return response.data || response
  }

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      // ✅ Only invalidate cache here
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    },
  })

  return mutation
}


// export default function CreateProduct() {
//   const { mutate, isPending } = useMutateData("/products", "POST", ["products"])

//   const handleAddProduct = () => {
//     mutate(
//       { name: "iPhone 16", price: 1200 },
//       {
//         onSuccess: (data) => {
//           toast.success("Product created successfully!")
//           console.log("New Product:", data)
//         },
//         onError: (error) => {
//           toast.error(error.message || "Failed to create product")
//         },
//       }
//     )
//   }

//   return (
//     <button onClick={handleAddProduct} disabled={isPending}>
//       {isPending ? "Adding..." : "Add Product"}
//     </button>
//   )
// }