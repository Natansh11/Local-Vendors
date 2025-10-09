import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'

interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

// Fetch vendors
export const useVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data } = await apiClient.get<Vendor[]>('/vendors')
      return data
    },
  })
}

// Create vendor
export const useCreateVendor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (vendorData: Omit<Vendor, 'id'>) => {
      const { data } = await apiClient.post<Vendor>('/vendors', vendorData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
    },
  })
}

// Update vendor
export const useUpdateVendor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...vendorData }: Vendor) => {
      const { data } = await apiClient.put<Vendor>(`/vendors/${id}`, vendorData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
    },
  })
}

// Delete vendor
export const useDeleteVendor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/vendors/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
    },
  })
}
