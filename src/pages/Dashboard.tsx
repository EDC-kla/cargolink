import React, { useEffect, useState } from "react";
import { Shipment } from "@/types/database.types";
import { shipmentService } from "@/services/shipmentService";

const Dashboard = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await shipmentService.listShipments();
        setShipments(data);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const transformShipmentData = (data: any): Shipment => {
    return {
      ...data,
      max_piece_dimensions: typeof data.max_piece_dimensions === 'string' 
        ? JSON.parse(data.max_piece_dimensions)
        : data.max_piece_dimensions || {
            length: 0,
            width: 0,
            height: 0,
            weight: 0
          },
      temperature_range: typeof data.temperature_range === 'string'
        ? JSON.parse(data.temperature_range)
        : data.temperature_range || {
            min: null,
            max: null,
            unit: 'C'
          },
      stops: Array.isArray(data.stops) ? data.stops.map((stop: any) => ({
        location: stop.location,
        stop_type: stop.stop_type,
        arrival_date: stop.arrival_date,
        departure_date: stop.departure_date,
        notes: stop.notes
      })) : []
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment.id}>{shipment.origin} to {shipment.destination}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
