// components/QuestionInput.js
import React, { useState } from 'react';

const QuestionInput = ({
    userQuestion,
    onQuestionChange,
    isDisabled = false,
    placeholder = "What guidance are you seeking? (Optional)"
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded && !userQuestion) {
            // Focus on input when expanding
            setTimeout(() => {
                document.getElementById('tarot-question-input')?.focus();
            }, 100);
        }
    };

    const handleQuestionChange = (e) => {
        onQuestionChange(e.target.value);
    };

    const clearQuestion = () => {
        onQuestionChange("");
    };

    return (
        <div className="question-input mb-6">
            <div className="flex items-center justify-between mb-3">
                <button
                    onClick={handleToggle}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    disabled={isDisabled}
                >
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                        ▶
                    </span>
                    <span className="font-medium">Ask a Question</span>
                    <span className="text-sm text-white/60">(Optional)</span>
                </button>

                {userQuestion && (
                    <button
                        onClick={clearQuestion}
                        className="text-white/60 hover:text-white text-sm transition-colors"
                        disabled={isDisabled}
                    >
                        Clear
                    </button>
                )}
            </div>

            {(isExpanded || userQuestion) && (
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                    <textarea
                        id="tarot-question-input"
                        value={userQuestion}
                        onChange={handleQuestionChange}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                        rows="3"
                        maxLength="500"
                    />
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-white/60 text-sm">
                            Frame your question clearly for the most insightful reading.
                        </p>
                        <span className="text-white/50 text-xs">
                            {userQuestion.length}/500
                        </span>
                    </div>
                </div>
            )}

            {userQuestion && !isExpanded && (
                <div className="bg-white/5 backdrop-blur rounded-lg p-3 border border-white/10 mt-2">
                    <p className="text-white/80 text-sm italic">
                        "{userQuestion.length > 100 ? userQuestion.substring(0, 100) + '...' : userQuestion}"
                    </p>
                </div>
            )}
        </div>
    );
};

export default QuestionInput;
