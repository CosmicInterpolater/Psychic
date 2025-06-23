import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ 
    service, 
    index = 0, 
    onBookSession 
}) => {
    return (
        <div
            className={`cosmic-card-service animated animate-fadeInUp`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">
                {service.title}
            </h3>
            <p className="service-description">
                {service.description}
            </p>
            <div className="service-price">
                ${service.price} - {service.duration} minutes
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
                <button
                    onClick={() => onBookSession(service.id)}
                    className="cosmic-button-ghost"
                >
                    Book Session
                </button>
                {service.route && (
                    <Link to={service.route} className="cosmic-button-ghost">
                        Try Interactive
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ServiceCard;