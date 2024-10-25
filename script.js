document.getElementById('convertButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a Word file.");
        return;
    }

    const API_SECRET = 'secret_zD42gfY8LZvAOc63'; // Replace with your actual ConvertAPI secret key
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`https://v2.convertapi.com/convert/docx/to/pdf?Secret=${API_SECRET}&StoreFile=true&Timeout=120`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error ${errorResponse.Code}: ${errorResponse.Message}`);
        }

        const result = await response.json();
        const pdfFileUrl = result.Files[0].Url;

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = pdfFileUrl;
        downloadLink.download = file.name.replace('.docx', '.pdf');
        downloadLink.style.display = 'block';
        downloadLink.textContent = 'Download PDF';
    } catch (error) {
        console.error('Error during Word to PDF conversion:', error);
        alert(`An error occurred while converting Word to PDF: ${error.message}`);
    }
});

// Image to PDF Conversion
document.getElementById('convertImageButton').addEventListener('click', async () => {
    const imageFileInput = document.getElementById('imageFileInput');
    const imageFile = imageFileInput.files[0];

    if (!imageFile) {
        alert("Please select an image file.");
        return;
    }

    const IMAGE_API_SECRET = 'secret_6AZcRwgE2nhCzquJ'; // Your actual ConvertAPI secret key for images
    const formData = new FormData();
    formData.append('Files[0]', imageFile); // Note the change here

    try {
        const response = await fetch(`https://v2.convertapi.com/convert/images/to/pdf?Secret=${IMAGE_API_SECRET}&StoreFile=true`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error ${errorResponse.Code}: ${errorResponse.Message}`);
        }

        const result = await response.json();
        const pdfFileUrl = result.Files[0].Url;

        const downloadImageLink = document.getElementById('downloadImageLink');
        downloadImageLink.href = pdfFileUrl;
        downloadImageLink.download = imageFile.name.replace(/\.(jpg|jpeg|png)$/, '.pdf');
        downloadImageLink.style.display = 'block';
        downloadImageLink.textContent = 'Download PDF';
    } catch (error) {
        console.error('Error during Image to PDF conversion:', error);
        alert(`An error occurred while converting image to PDF: ${error.message}`);
    }
});
