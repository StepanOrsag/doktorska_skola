import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { eventService } from "../../../entities/event";
import { formatDate, formatTime } from "../../../shared/lib/formatters";
import { useAuth } from "../../../entities/user";
import "./EventDetail.css";

function EventDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        eventService.getById(id)
            .then(data => setEvent(data))
            .catch(err => console.error("Chyba při načítání: ", err));
    }, [id]);

    if (!event) return <div className="loading">Načítám detaily akce...</div>;

    return (
        <div className="event-detail-wrapper">
            <div className="navlink-container">
                <NavLink to="/" className="nav-link">PŘEHLED AKCÍ</NavLink>
                <h1> &gt; DETAIL AKCE</h1>
            </div>

            <div className="event-detail-card">
                <div className="event-detail-header">
                    <h2>{event.title}</h2>
                    <span className="event-type-badge">{event.eventType}</span>
                </div>

                <div className="event-detail-body">
                    <div className="detail-info-section">
                        <h3>O AKCI</h3>
                        <p className="description">{event.description}</p>
                    </div>

                    <div className="detail-meta-grid">
                        <div className="meta-item">
                            <span className="label">Datum:</span>
                            <span className="value">{formatDate(event.date)}</span>
                        </div>
                        <div className="meta-item">
                            <span className="label">Čas:</span>
                            <span className="value">{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                        </div>
                        <div className="meta-item">
                            <span className="label">Kapacita:</span>
                            <span className="value">{event.capacity} míst</span>
                        </div>
                    </div>
                </div>
                
                <div className="event-detail-footer">
                    {user?.role === 'ORGANIZATOR' && (
                        <NavLink to={`/akce/edit/${id}`} className="btn btn-secondary">Upravit akci</NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventDetail;
