"use client"

import { useEffect, useMemo } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { ArrowUpRight } from "lucide-react"
import {
  BELLEVUE_LOCATION,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_PLACE_URL,
} from "@/lib/location"

/** Carto Dark Matter — free OSM-based tiles, elegant on black UI */
const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

function InvalidateSize() {
  const map = useMap()

  useEffect(() => {
    const run = () => map.invalidateSize()
    run()
    const t1 = window.setTimeout(run, 150)
    const t2 = window.setTimeout(run, 500)

    const ro = new ResizeObserver(run)
    ro.observe(map.getContainer())

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      ro.disconnect()
    }
  }, [map])

  return null
}

type ElegantMapProps = {
  className?: string
}

export function ElegantMap({ className }: ElegantMapProps) {
  const position: [number, number] = [
    BELLEVUE_LOCATION.latitude,
    BELLEVUE_LOCATION.longitude,
  ]

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;transform:translateY(-4px)">
            <div style="
              margin-bottom:6px;
              padding:5px 10px;
              border:1px solid rgba(184,149,110,0.45);
              background:rgba(26,26,26,0.9);
              color:#b8956e;
              font:500 9px/1.2 ui-sans-serif,system-ui,sans-serif;
              letter-spacing:0.2em;
              text-transform:uppercase;
              white-space:nowrap;
              backdrop-filter:blur(8px);
            ">Bellevue Chalets</div>
            <div style="
              width:18px;height:18px;border-radius:9999px;
              background:#b8956e;
              box-shadow:0 0 0 6px rgba(184,149,110,0.18), 0 8px 20px rgba(0,0,0,0.45);
              border:2px solid #f8f6f3;
            "></div>
          </div>
        `,
      }),
    []
  )

  return (
    <div
      className={`relative flex h-[420px] w-full flex-col overflow-hidden border border-white/10 bg-[#0e1210] lg:h-full lg:min-h-[420px] ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[400] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(14,18,16,0.5)_100%)]"
      />

      <div className="relative h-[calc(100%-4.25rem)] w-full shrink-0">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full [&_.leaflet-control-attribution]:bg-bellevue-black/70 [&_.leaflet-control-attribution]:text-[9px] [&_.leaflet-control-attribution]:text-white/40"
          style={{ background: "#0e1210" }}
        >
          <TileLayer url={TILE_URL} attribution={TILE_ATTR} />
          <Marker
            position={position}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                window.open(GOOGLE_MAPS_PLACE_URL, "_blank", "noopener,noreferrer")
              },
            }}
          />
          <InvalidateSize />
        </MapContainer>

        {/* Clickable overlay hint — keeps map interactive, opens Maps on double purpose via marker */}
        <a
          href={GOOGLE_MAPS_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 left-3 z-[500] border border-white/15 bg-bellevue-black/80 px-3 py-1.5 font-sans text-[9px] tracking-[0.18em] uppercase text-white/70 backdrop-blur-md transition-colors hover:border-bellevue-gold/50 hover:text-bellevue-gold"
        >
          View on Google Maps
        </a>
      </div>

      <div className="relative z-[500] flex h-[4.25rem] shrink-0 items-center justify-between gap-4 border-t border-white/10 bg-bellevue-black/95 px-5 backdrop-blur-md">
        <div className="min-w-0">
          <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-bellevue-gold/80">
            Location
          </p>
          <p className="mt-1 truncate font-sans text-sm text-white/85">
            {BELLEVUE_LOCATION.address}
          </p>
        </div>

        <a
          href={GOOGLE_MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group/dir inline-flex shrink-0 items-center gap-2 border border-bellevue-gold/40 px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase text-bellevue-gold transition-colors duration-300 hover:border-bellevue-gold hover:bg-bellevue-gold hover:text-bellevue-black"
        >
          Get Directions
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/dir:translate-x-0.5 group-hover/dir:-translate-y-0.5" />
        </a>
      </div>
    </div>
  )
}
