describe("Rendering", () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234")
    })
    it("should not be blank page", () => {
        cy.get("body").find(".input").should("have.length.gte", 1)
        cy.get("body").find(".direction").should("have.length.gte", 1)
        cy.get("body").find(".output").should("have.length.gte", 1)

        cy.get(".input")
        .should("not.be.empty")
    })
})

describe("Use cipher", () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234")
    })

    it("should encrypt properly", () => {
        cy.get(".input textarea")
        .clear()
        .type("HELLO WORLD!")

        cy.get(".output textarea")
        .should("have.value", "JGNNQ YQTNF!")

        cy.get("#direction")
        .should("have.css", "transform", "none")
    })

    it("should decrypt properly", () => {
        cy.get(".output textarea")
        .clear()
        .type("JGNNQ YQTNF, K'O FGETARVGF!")

        cy.get(".input textarea")
        .should("have.value", "HELLO WORLD, I'M DECRYPTED!")

        cy.get("#direction")
        .should("have.css", "transform", "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)") // rotate(180deg)
    })
})
