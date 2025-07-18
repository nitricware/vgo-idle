class GameUI {

    populateUI() {
        console.log("populateUI");
        this.populateItemStore();
        this.populateBoostStore();

        this.populateHostDropDown("1");
        this.populateHostDropDown("2");
        this.populateHostDropDown("3");
    }

    populateItemStore() {
        let store = document.getElementById("item-store");
        let headline = this.createHeadline(2, "Item Store");
        store.appendChild(headline)
        for (let i in itemStore) {
            console.log("create "+ i)
            store.appendChild(this.createItemStoreElement(i));
        }
    }

    populateBoostStore() {
        let store = document.getElementById("boost-store");
        let headline = this.createHeadline(2, "Boost Store");
        store.appendChild(headline)
        for (let i in boostStore) {
            console.log("create "+ i)
            store.appendChild(this.createBoostStoreElement(i));
        }
    }

    populateHostDropDown(host) {
        console.log("populate host "+host)
        let dropdown = document.getElementById("host" + host + "-select");
        dropdown.onchange = function() {
            g.changeHost("slot"+host, this.value);
        }

        let option = document.createElement("option");
        option.value = "none";
        option.innerHTML = "None";
        dropdown.appendChild(option);

        for (let i in hostsStore) {
            console.log("add "+ i)
            let option = document.createElement("option");
            option.value = i;
            option.innerHTML = hostsStore[i].displayName;
            dropdown.appendChild(option);
        }
    }

    createHeadline(level, text) {
        let headline = document.createElement("h" + level);
        headline.innerHTML = text;
        return headline;
    }

    createItemStoreElement(item) {        
        let container = document.createElement("div");
        let counterContainer = document.createElement("div");
        let counter = document.createElement("span");
        let shop = document.createElement("div");
        
        container.className = "shop-item-container";

        counterContainer.className = "shop-item-counter";

        counter.innerHTML = "0";
        counter.id = itemStore[item].htmlIdentifier + "-counter";

        shop.className = "shop-item-cost";

        shop.appendChild(LocalizedTextElement("buy"));
        counterContainer.appendChild(document.createTextNode(" "));

        let buySingle = this.createBuyButton(
            itemStore[item].htmlIdentifier, 
            function() {
                g.buy(item);
            },
            1,
            itemStore[item].cost
        )

        shop.appendChild(buySingle);

        counterContainer.appendChild(counter);
        
        counterContainer.appendChild(document.createTextNode(" "));
        counterContainer.appendChild(document.createTextNode(itemStore[item].displayName.plural));

        container.appendChild(counterContainer);
        container.appendChild(shop);

        return container;
    }

    createBoostStoreElement(item) {
        let container = document.createElement("div");
        let counterContainer = document.createElement("div");
        let counter = document.createElement("span");
        let shop = document.createElement("div");
        
        container.className = "shop-item-container";

        counterContainer.className = "shop-item-counter";

        counter.innerHTML = "0";
        counter.id = boostStore[item].htmlIdentifier + "-counter";

        shop.className = "shop-item-cost";

        shop.appendChild(LocalizedTextElement("buy"));
        counterContainer.appendChild(document.createTextNode(" "));

        let buySingle = this.createBuyButton(
            boostStore[item].htmlIdentifier, 
            function() {
                g.buyBoost(item);
            },
            1,
            boostStore[item].cost
        )

        shop.appendChild(buySingle);

        counterContainer.appendChild(counter);
        
        counterContainer.appendChild(document.createTextNode(" "));
        counterContainer.appendChild(document.createTextNode(boostStore[item].displayName.plural));

        container.appendChild(counterContainer);
        container.appendChild(shop);

        return container;
    }

    createBuyButton(id, func, quantity, price) {
        let button = document.createElement("button");
        let cost = document.createElement("span");

        button.id = "buy-" + id;
        button.onclick = func;
        
        button.appendChild(document.createTextNode(quantity + " "));
        button.appendChild(LocalizedTextElement("for"));
        button.appendChild(document.createTextNode(" "));

        cost.id = id + "-cost";
        cost.appendChild(document.createTextNode(price));

        button.appendChild(cost);


        return button;
    }
}