import React, { useState } from 'react';
import '../components/styles/feedback.css';

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data, such as send it to a server
        console.log('Submitted form data:', { rating, comment, name, email });
        // Reset the form fields
        setRating(0);
        setComment('');
        setName('');
        setEmail('');
    };

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    return (
        <form className="feedback-form" onSubmit={handleSubmit}>
            <h2>Feedback Form</h2>
            <div className="form-row">
                <label htmlFor="rating">Rating:</label>
                <div className="rating-container">
                    <input
                        type="radio"
                        name="rating"
                        value="5"
                        checked={rating === 5}
                        onChange={handleRatingChange}
                        id="rating-5"
                    />
                    <label htmlFor="rating-5"></label>
                    <input
                        type="radio"
                        name="rating"
                        value="4"
                        checked={rating === 4}
                        onChange={handleRatingChange}
                        id="rating-4"
                    />
                    <label htmlFor="rating-4"></label>
                    <input
                        type="radio"
                        name="rating"
                        value="3"
                        checked={rating === 3}
                        onChange={handleRatingChange}
                        id="rating-3"
                    />
                    <label htmlFor="rating-3"></label>
                    <input
                        type="radio"
                        name="rating"
                        value="2"
                        checked={rating === 2}
                        onChange={handleRatingChange}
                        id="rating-2"
                    />
                    <label htmlFor="rating-2"></label>
                    <input
                        type="radio"
                        name="rating"
                        value="1"
                        checked={rating === 1}
                        onChange={handleRatingChange}
                        id="rating-1"
                    />
                    <label htmlFor="rating-1"></label>
                </div>
            </div>
            <div className="form-row">
                <label htmlFor="comment">Comment:</label>
                <textarea
                    name="comment"
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <div className="form-row">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-row">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-row">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default FeedbackForm;
