describe("Presentation video", () => {
  it("Route", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.scrollTo("bottom", { duration: 3000 });
    cy.wait(500);
    cy.scrollTo("top", { duration: 3000 });
    cy.wait(1000);
    cy.get(".button-login").click({ waitForAnimations: true });
    cy.wait(1000);
    cy.get("input[type=email]").type("alex.suner@gmail.com", { delay: 80 });
    cy.get("input[type=password]").type("1234", { delay: 200 });
    cy.wait(1000);
    cy.get("button[type=submit]").click({ waitForAnimations: true });
    cy.wait(1000);
    cy.wait(500);
    cy.get(".categoryHome a[href*=2]").click({ waitForAnimations: true });
    cy.wait(1000);
    cy.get(".products-listing").scrollIntoView({ duration: 1000 });
    cy.wait(1000);
    cy.get(".products-listing")
      .find("li:nth-child(2)")
      .click({ waitForAnimations: true });
    cy.get(".product-card img").scrollIntoView({ duration: 500 });
    cy.wait(1000);
    cy.get(".select-quantity button:nth-child(3)")
      .scrollIntoView({
        duration: 100,
        offset: { top: -335, left: 0 },
      })
      .wait(500)
      .click()
      .wait(500)
      .click()
      .wait(500)
      .click()
      .wait(1000);
    cy.get(".addToCart").click();
    cy.wait(1000);
    cy.get(".header-center").scrollIntoView({ duration: 500 });
    cy.get(".product-search").click().wait(500);
    cy.get(".product-search-list-input")
      .type("Zion", { delay: 200 })
      .wait(1000);
    cy.get(".individual-product h2").contains("Zion 2").click();
    cy.wait(1000);
    cy.get(".select-quantity button:nth-child(1)")
      .scrollIntoView({
        duration: 500,
        offset: { top: -335, left: 0 },
      })
      .wait(500)
      .click()
      .wait(500)
      .click()
      .wait(1000);
    cy.get(".addToCart").click().wait(1000);
    cy.scrollTo("top", { duration: 1000 }).wait(500);
    cy.get(".categoryHome a[href*=3]")
      .click({ waitForAnimations: true })
      .wait(1000);
    cy.get(".products-listing").scrollIntoView({ duration: 1000 });
    cy.wait(1000);
    cy.get(".products-listing")
      .find("li:nth-child(1) #plus")
      .click({ waitForAnimations: true })
      .wait(500);
    cy.scrollTo("top", { duration: 1000 }).wait(500);
    cy.get(".shopping-cart > svg").click().wait(2000);
    cy.get(".checkout").click().wait(1000);
    cy.get(".user-order-info-form-list")
      .as("form")
      .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } });
    cy.get("@form")
      .find("li:nth-child(1) input")
      .type("Hall Street", { delay: 100 });
    cy.get("@form").find("li:nth-child(2) input").type("82", { delay: 100 });
    cy.get("@form")
      .find("li:nth-child(3) .input-select .stdropdown-input input")
      .type("United St", { delay: 100 })
      .wait(300);
    cy.get("@form")
      .find("li:nth-child(3) .input-select .stdropdown-menu div:nth-child(1)")
      .click();
    cy.wait(300);
    cy.get("@form")
      .find("li:nth-child(4) .input-select .stdropdown-input input")
      .type("Cali", { delay: 100 })
      .wait(300);
    cy.get("@form")
      .find("li:nth-child(4) .input-select .stdropdown-menu div:nth-child(1)")
      .click();
    cy.wait(300);
    cy.get("@form")
      .find("li:nth-child(5) .input-select .stdropdown-input input")
      .type("Sunny", { delay: 100 })
      .wait(300);
    cy.get("@form")
      .find("li:nth-child(5) .input-select .stdropdown-menu div:nth-child(4)")
      .click();
    cy.wait(300);
    cy.get("@form").find("li:nth-child(6) input").type("94087", { delay: 100 });
    cy.get("@form").find("li:nth-child(7) input").type("(760) 738-9222", {
      delay: 100,
    });
    cy.wait(500);
    cy.get(".user-order-info-form").submit();
    cy.wait(500);
    cy.get(".user-shipping-method-form-list")
      .find("li:nth-child(2) .user-shipping-method-info")
      .click()
      .wait(500);
    cy.get(".user-shipping-method-form").submit();
    cy.wait(500);
    cy.get(".credit-card-info > input:nth-child(1)").type("374245455400126", {
      delay: 100,
    });
    cy.wait(300);
    cy.get(".credit-card-info > input:nth-child(2)").type("Alex Sunyer Sainz", {
      delay: 100,
    });
    cy.wait(300);
    cy.get(".credit-card-info div input:nth-child(1)").type("05/2026", {
      delay: 100,
    });
    cy.wait(300);
    cy.get(".credit-card-info div input:nth-child(2)").type("980", {
      delay: 100,
    });
    cy.wait(500);
    cy.get(".buttons-submit button[type='submit']")
      .scrollIntoView({
        duration: 1000,
      })
      .click();
    cy.scrollTo("top", { duration: 1000 });
  });
});
