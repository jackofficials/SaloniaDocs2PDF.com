document.getElementById('convertButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const API_SECRET = 'secret_zD42gfY8LZvAOc63'; // Replace with your actual ConvertAPI secret key
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Send request to ConvertAPI for Word to PDF conversion
        const response = await fetch(`https://v2.convertapi.com/convert/docx/to/pdf?Secret=${API_SECRET}&StoreFile=true&Timeout=120`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const result = await response.json();
        const pdfFileUrl = result.Files[0].Url;

        // Create a download link for the converted PDF
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = pdfFileUrl;
        downloadLink.download = file.name.replace('.docx', '.pdf');
        downloadLink.style.display = 'block';
        downloadLink.textContent = 'Download PDF';
    } catch (error) {
        console.error('Error during conversion:', error);
        alert('An error occurred. Please try again.');
    }
});