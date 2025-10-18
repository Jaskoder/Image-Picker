const HEAD = document.head;
const BODY = document.body;
const callButton = document.createElement('button');
const imagesWrapper = document.createElement('div');
const closeButton = document.createElement('button');
const overlay = document.createElement('div');

let isOpen = false;

function fetchImages() {
    // Filtrer les images trop petites (probablement des icônes)
    const images = Array.from(document.querySelectorAll('img')).filter(img => {
        return img.naturalWidth > 50 && img.naturalHeight > 50;
    });
    return images;
}

function applyStylesToElement(style, element) {
    for (const key in style) {
        element.style[key] = style[key];
    }
}

function renderImagesItems(imagesDOMList, styles) {
    if (!imagesDOMList || imagesDOMList.length === 0) {
        const noImagesMessage = document.createElement('div');
        noImagesMessage.textContent = 'Aucune image trouvée sur cette page';
        noImagesMessage.style.textAlign = 'center';
        noImagesMessage.style.padding = '20px';
        noImagesMessage.style.color = '#666';
        imagesWrapper.appendChild(noImagesMessage);
        return;
    }

    imagesDOMList.forEach((img, i) => {
        const imageItemElement = document.createElement('div');
        const image = document.createElement('img');
        const spanForTitle = document.createElement('span');
        const downloadLink = document.createElement('a');

        image.setAttribute('src', img.src);
        image.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            spanForTitle.textContent = 'Image non chargée';
        });

        spanForTitle.textContent = img.alt || `Image ${i + 1}`;
        downloadLink.textContent = 'Download';

        downloadLink.setAttribute('href', img.src);
        downloadLink.setAttribute('target', '_blank');
        downloadLink.download = img.alt || `image-${i + 1}`;

        applyStylesToElement(styles.imageItem, imageItemElement);
        applyStylesToElement(styles.downloadLink, downloadLink);
        applyStylesToElement(styles.image, image);
        applyStylesToElement(styles.title, spanForTitle);

        imageItemElement.appendChild(image);
        imageItemElement.appendChild(spanForTitle);
        imageItemElement.appendChild(downloadLink);

        imagesWrapper.appendChild(imageItemElement);
    });
}

function toggleImagePicker() {
    if (!isOpen) {
        const images = fetchImages();
        renderImagesItems(images, styles);
        imagesWrapper.appendChild(closeButton);
        BODY.appendChild(overlay);
        BODY.appendChild(imagesWrapper);
        overlay.style.display = 'block';
    } else {
        closeImagePicker();
    }
    isOpen = !isOpen;
}

function closeImagePicker() {
    imagesWrapper.innerHTML = '';
    overlay.style.display = 'none';
    if (imagesWrapper.parentNode === BODY) {
        BODY.removeChild(imagesWrapper);
    }
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9998,
        display: 'none'
    },
    imagesWrapper: {
        padding: '15px',
        display: 'grid',
        gap: '15px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        backgroundColor: '#ffffff',
        position: 'fixed',
        top: '5%',
        right: '5%',
        bottom: '5%',
        left: '5%',
        boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.2)',
        overflowY: 'scroll',
        zIndex: 9999,
        borderRadius: '10px'
    },
    callButton: {
        cursor: 'pointer',
        position: 'fixed',
        bottom: '10%',
        right: '0%',
        width: '60px',
        height: '40px',
        backgroundColor: '#440aff',
        color: '#ffffff',
        borderRadius: '16px 0 0 16px',
        border: 'none',
        alignContent: 'center',
        boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 10000,
        fontSize: '14px',
        fontWeight: 'bold'
    },
    closeButton: {
        position: 'fixed',
        top: '6%',
        right: '6%',
        width: '40px',
        height: '40px',
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '20px',
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageItem: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content'
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '3px',
        marginBottom: '8px'
    },
    title: {
        display: 'block',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666666',
        marginBottom: '8px',
        fontWeight: '500',
        wordBreak: 'break-word'
    },
    downloadLink: {
        cursor: 'pointer',
        backgroundColor: '#440aff',
        padding: '8px 12px',
        display: 'block',
        margin: '5px auto',
        textDecoration: 'none',
        color: '#fff',
        fontSize: '12px',
        textAlign: 'center',
        borderRadius: '3px',
        border: 'none',
        width: '90%',
        fontWeight: 'bold'
    }
}

// Configuration des éléments
callButton.textContent = 'Pick';
closeButton.textContent = '×';
closeButton.innerHTML = '&times;'; // Meilleur rendu du symbole

// Application des styles
applyStylesToElement(styles.imagesWrapper, imagesWrapper);
applyStylesToElement(styles.callButton, callButton);
applyStylesToElement(styles.closeButton, closeButton);
applyStylesToElement(styles.overlay, overlay);

// Gestion des événements
callButton.addEventListener('click', toggleImagePicker);
closeButton.addEventListener('click', closeImagePicker);
overlay.addEventListener('click', closeImagePicker);

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        closeImagePicker();
        isOpen = false;
    }
});

// Ajouter les éléments au DOM
BODY.appendChild(callButton);
BODY.appendChild(overlay);

// Initialisation
isOpen = false;
