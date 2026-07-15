import { registerOTel } from "@vercel/otel";

export function register(){
    registerOTel({
        serviceName: "between-the-lines"
    })
}