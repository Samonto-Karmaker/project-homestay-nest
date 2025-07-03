/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
describe("Functionality Check", () => {
    let jwt: string

    beforeAll(async () => {
        const user = {
            username: "Samanta Karmaker",
            email: "samonto0726@gmail.com",
            password: "kojiyugUIION*(&907",
        }
        await fetch("http://auth:3001/user", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const res = await fetch("http://auth:3001/login", {
            method: "POST",
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        jwt = await res.text()
    })
    test("Create & Get", async () => {
        const createdReservation = await createReservation()
        const responseGet = await fetch(
            `http://reservations:3000/reservations/${createdReservation._id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jwt,
                },
            }
        )
        const reservation = await responseGet.json()
        expect(createdReservation).toEqual(reservation)
    })

    const createReservation = async () => {
        const responseCreate = await fetch(
            "http://reservations:3000/reservations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jwt,
                },
                body: JSON.stringify({
                    startDate: "05/16/2025",
                    endDate: "05/20/2025",
                    paymentIntent: {
                        amount: 50,
                        card: {
                            cvc: "404",
                            exp_month: 12,
                            exp_year: 2027,
                            number: "4242 4242 4242 4242",
                        },
                    },
                }),
            }
        )
        expect(responseCreate.ok).toBeTruthy()
        return responseCreate.json()
    }
})
