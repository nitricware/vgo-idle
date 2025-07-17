let upgradesStore = {
    mcdouble: {
        propertyModification: function(itemStore) {
            itemStore.subscriber.autoProduce = itemStore.subscriber.autoProduce + 0.5
        },
        cost: 1000
    }
}