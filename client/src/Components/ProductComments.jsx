import React, { useState, useEffect, useRef } from "react";

const ProductComments = ({ productId, comments = [], onAddComment, currentUser }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  // Handle smooth transition and scroll to form when shown
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create comment object using the current user info
    const commentData = {
      id: Date.now().toString(),
      productId,
      userId: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar || "https://via.placeholder.com/40", // Fallback avatar
      rating,
      text: newComment,
      date: new Date().toISOString(),
    };
    
    // Call the parent handler
    onAddComment(commentData);
    
    // Reset form
    setNewComment("");
    setRating(5);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i <= rating ? "gold" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className="inline-block"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="mt-16 w-full">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-3xl font-[350]">Customer Reviews</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 sm:px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 whitespace-nowrap"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Review Form with smooth transition */}
      <div 
        ref={formRef}
        className={`bg-gray-50 p-6 rounded-lg mb-8 w-full overflow-hidden transition-all duration-300 ${
          showForm ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <h3 className="text-xl font-medium mb-4">Share Your Experience</h3>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label htmlFor="rating" className="block mb-2 text-gray-700 text-lg">
              Rating
            </label>
            <div className="flex gap-2 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={star <= rating ? "gold" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block mb-2 text-gray-700 text-lg">
              Your Review
            </label>
            <textarea
              id="comment"
              rows="6"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Share your thoughts about this product..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white text-lg rounded-full hover:bg-gray-800 transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      {comments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-8 w-full">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start">
                {/* Avatar */}
                <div className="mr-4 flex-shrink-0">
                  <img 
                    src={comment.avatar || "https://via.placeholder.com/40"} 
                    alt={`${comment.name}'s avatar`} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                
                {/* Comment content */}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-medium text-lg">{comment.name}</span>
                      <span className="text-gray-500 hidden sm:inline">•</span>
                      <span className="text-gray-500 text-sm">{formatDate(comment.date)}</span>
                    </div>
                    <div className="flex mt-1 sm:mt-0">{renderStars(comment.rating)}</div>
                  </div>
                  <p className="text-gray-700 mt-2">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Summary - Only show if there are reviews */}
      {comments.length > 0 && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Review Summary</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">
                {(comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length).toFixed(1)}
              </span>
              <span className="text-gray-500">/ 5</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{comments.length} {comments.length === 1 ? 'review' : 'reviews'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComments;