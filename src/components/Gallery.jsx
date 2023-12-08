// Gallery.js

import React, { useState } from 'react';
import '../components/styles/gallery.css';

function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        {
            id: 1,
            src:
                'https://www.motortrend.com/uploads/2021/11/001-biggest-trucks-at-the-2021-sema-show.jpg',
        },
        {
            id: 2,
            src: 'https://i.ytimg.com/vi/cmMf3NeFjfE/maxresdefault.jpg',
        },
        {
            id: 3,
            src:
                'https://5.imimg.com/data5/SELLER/Default/2021/3/WP/JJ/PH/125574030/full-truck-load-transportation-services-500x500.jpg',
        },
        {
            id: 4,
            src:
                'https://media.wired.com/photos/60f9b8a417ecd990dacf3c75/191:100/w_1280,c_limit/Business-Self-Driving-Trucks-TuSimple.jpg',
        },
        {
            id: 5,
            src: 'https://i.pinimg.com/736x/e8/94/2a/e8942a5ac02637f6f1685b8f964d8a06.jpg',
        },
        {
            id: 6,
            src: 'https://images.news18.com/ibnlive/uploads/2022/09/tata-truck-1.jpg',
        },
        {
            id: 7,
            src:
                'https://m.economictimes.com/thumb/msid-97260718,width-6168,height-3470,resizemode-4,imgsize-870828/tata-motors.jpg',
        },
        {
            id: 8,
            src:
                'https://www.topgear.com/sites/default/files/news-listicle/image/2022/06/7.%20Alpha%20Wolf.jpg?w=424&h=239',
        },
        {
            id: 9,
            src:
                'https://hips.hearstapps.com/hmg-prod/images/volvo-vnr-electric-6x2-with-reefer-trailer-passenger-side-view-on-the-road-daytime-shot-1607106606.jpg',
        },
        {
            id: 10,
            src:
                'https://media.npr.org/assets/img/2020/06/25/electric-trucks-ecascadia-and-m2-daimler_wide-166a3b8414c6b48e090366f6ee4454090590dbbe.jpeg',
        },
        {
            id: 11,
            src:
                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ddctec-16381-emobility-may-blog-hero-1669905385.jpg?crop=1.00xw:0.928xh;0,0.0722xh&resize=640:*',
        },
        {
            id: 12,
            src:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjN7e-nCMZLJiGPdJuhsJ61-x2KYBbj0DzRg&usqp=CAU',
        },
    ];

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div><button className="rainbow-button">
                Upload
            </button></div>
            <div className="gallery-container">
                {images.map((image) => (
                    <div key={image.id} className="gallery-item" onClick={() => handleImageClick(image.src)}>
                        <img src={image.src} alt={`Image ${image.id}`} />
                    </div>
                ))
                }
                {
                    selectedImage && (
                        <div className="modal-overlay" onClick={handleModalClose}>
                            <div className="modal-container">
                                <img src={selectedImage} alt="Selected" />
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    );
}

export default Gallery;
