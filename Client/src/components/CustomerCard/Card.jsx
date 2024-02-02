import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const CustomerMap = ({ latitude, longitude }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: '400px',
        width: '400px',
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]}>
        <Popup>
          Latitud: {latitude}, Longitud: {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default CustomerMap
