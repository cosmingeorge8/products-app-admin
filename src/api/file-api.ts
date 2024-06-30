const API_BASE_URL = 'http://localhost:5001/upload';

export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    return data.imageUrl;
}