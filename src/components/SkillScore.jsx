import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const SkillScore = ({ score = 0, max = 5 }) => {
    const stars = [];

    for (let i = 1; i <= max; i++) {
        if (score >= i) {
            stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
        } else if (score >= i - 0.5) {
            stars.push(<StarHalf key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
        } else {
            stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <div className="flex">{stars}</div>
            <span className="text-sm font-medium text-gray-600">
                {score.toFixed(1)} / {max}
            </span>
        </div>
    );
};

export default SkillScore;
