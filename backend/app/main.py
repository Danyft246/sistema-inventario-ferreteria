from fastapi import FastAPI


app = FastAPI(
    title="API del Sistema de Inventario",
    description="Backend local para la gestión del inventario de la ferretería.",
    version="0.1.0",
)


@app.get("/api/health", tags=["Sistema"])
def comprobar_estado() -> dict[str, str]:
    return {"estado": "ok"}