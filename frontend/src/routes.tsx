import axios from "axios";

export const getAll = async () => {
  try {
    const response = await axios.get("/api/crm/getall");
    console.log(response);
    const mapped_data = Array.isArray(response.data)
      ? response.data.map((item) => ({
          id: item._id,
          name: item.name,
          company: item.company,
          number: item.number,
          email: item.email,
        }))
      : [];
    console.log(mapped_data);
    return mapped_data;
  } catch (error) {
    console.error("Unable to get all leads", error);
    throw error;
  }
};

export const deleteLead = async (ID: string) => {
  try {
    const response = await axios.delete("/api/crm/delete", {
      params: {
        id: ID,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Unable to delete Lead", error);
  }
};

export const createLead = async (
  name: string,
  company: string,
  number: string,
  email: string
) => {
  try {
    const response = await axios.post("/api/crm/new", {
      name: name,
      company: company,
      number: number,
      email: email,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Unable to create a new Lead", error);
    throw error;
  }
};

export const modifyLead = async (ID: string, name: string, company: string, number: string, email: string) => {
    try {
        const response = await axios.put("/api/crm/modify",
            {
                name: name,
                company: company,
                number: number,
                email: email
            },
            {
                params: {
                id: ID
            }}

        )
        return response.data
    } catch (error) {
        console.error("Unable to modify lead", error)
        throw error
    }
}