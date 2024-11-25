const API_URL = 'http://161.35.143.238:8000/aschlechter';

const fetchWithRetry = async (url: string, options: RequestInit, retries: number = 3, delay: number = 1000) => {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json();
    } catch (error:any) {
        if (retries > 0) {
            // Retry with delay
            console.error(`Fetch failed, retrying... (${retries} attempts left)`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay);
        } else {
            throw new Error(`Failed to fetch after several retries: ${error}`);
        }
    }
}

export const getEquipos = async () => {
    try {
        const data = await fetchWithRetry(API_URL, {
            headers: {
                "bypass-tunnel-reminder": "true"
            }
        });
        return data;
    } catch (error:any) {
        console.error('Error fetching planets:', error);
        throw error; 
    }
};

export const getEquipo = async (equipoID: any) => {
    try {
        const data = await fetchWithRetry(`${API_URL}/${equipoID}`, {
            headers: {
                "bypass-tunnel-reminder": "true"
            }
        });
        return data;
    } catch (error:any) {
        console.error('Error fetching planet details:', error);
        throw error;
    }
};

export const postEquipo = async (newEquipo: any) => {
    try {
        const data = await fetchWithRetry(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "bypass-tunnel-reminder": "true"
            },
            body: JSON.stringify(newEquipo)
        });
        return data;
    } catch (error:any) {
        console.error('Error posting planet:', error);
        throw error;
    }
};

export const deleteEquipo = async (equipoID: any) => {
    try {
        const data = await fetchWithRetry(`${API_URL}/${equipoID}`, {
            method: 'DELETE',
            headers: {
                "bypass-tunnel-reminder": "true"
            }
        });
        return data;
    } catch (error:any) {
        console.error('Error deleting planet:', error);
        throw error;
    }
};

export const putEquipo = async (equipoData: any) => {
    try {
        const data = await fetchWithRetry(`${API_URL}/${equipoData.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "bypass-tunnel-reminder": "true"
            },
            body: JSON.stringify(equipoData)
        });
        return data;
    } catch (error:any) {
        console.error('Error updating planet:', error);
        throw error;
    }
};
