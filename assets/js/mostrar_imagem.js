$(document).ready(function(){
    function previewImage(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('image-preview');
        preview.innerHTML = '';
        if (file) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = () => URL.revokeObjectURL(img.src);
            preview.appendChild(img);
        }
    }

    $('#input-file').on('change', previewImage);
});
