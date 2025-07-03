import { ping } from "tcp-ping"

describe("Health-Check", () => {
    test("reservations", async () => {
        const res = await fetch("http://reservations:3000")
        expect(res.ok).toBeTruthy()
    })
    test("auth", async () => {
        const res = await fetch("http://auth:3001")
        expect(res.ok).toBeTruthy()
    })

    test("payment", done => {
        ping(
            {
                address: "payments",
                port: 3003,
            },
            err => {
                if (err) fail()
                else done()
            }
        )
    })
    test("notification", done => {
        ping(
            {
                address: "notifications",
                port: 3003,
            },
            err => {
                if (err) fail()
                else done()
            }
        )
    })
})
