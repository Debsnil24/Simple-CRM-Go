import axios from "axios"

export const getAll = async () => {
    try {
        const response = await axios.get("/api/crm/getall");
        console.log(response)
        const mapped_data = Array.isArray(response.data)
            ? response.data.map((item) => ({
                id: item._id,
                name: item.name,
                company: item.company,
                number: item.number,
                email: item.email
            }))
            : [];
        console.log(mapped_data)
        return mapped_data
    } catch (error) {
        console.error("Unable to get all leads", error)
        throw error
    }
}