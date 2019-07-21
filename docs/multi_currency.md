

# Transactional Method

- Customer store currency local format.
- When `transaction occurred`, `store multiple conversion rates` for the transaction.
- In `country settings` configuration requires `multiple exchange rates` for each currency, which store through `input currency`. (base line currency).


- *For Accounts which is supposed to be in other currency (such as USD Account or USD Part of Credit Card), 
a separate ledger should be managed with baseline currency (second base line). 


- For different cross clients and geographies.
- You would `need to know the currency` of the entered `input values`.
- Then, You need to multiply, this by its associated entity exchange rate that was valid during the `transactions time period`.





# Functional Method

- Store in one base currency, hold conversion rates for this currency that apply over time.
- `frontend` and `database` is the best place to `convert values`.
- Exchange rate could be cached on the client (note each entity may use a different exchange rate).
- *This required one set of exchange rates (from base to all other required currencies)
To apply exchange rates, every transaction would need to be converted between the base and required currencies.



# Composite
- At point of transaction, `store transactional value` and `functional value`, `no exchange rate information` would need to be stored.
(This would not be suitable a solution as it effectively restricts you to two currencies for any given value)




# Comparison
- Realistically, you have to choose between function and transactional methods. Both have their advantages & disadvantages.
- Functional method not need to store local currency for transaction, needs to convert current db values to base currency,
 only needs one set of exchange rates




# Advanced Model
One currency table, with a few fields including numbers of decimals to be considered for the currency (yes, some currencies have to be managed with 3 decimals) and a exchange rate value, which has no other meaning than being an 'proposed/default exchange rate' when evaluating 'non-executed' or 'pending' financial transactions. In this currency table, one of the records has an exchange rate of 1. This is the main/pivot currency in our system.

Since exchange rates fluctuate, one approach is as mentioned - store an "entered as is" amount that is not converted but display a companion field which is display only and shows the converted amount. In order to do the conversion, a table of exchange rates and their applicable date ranges would be required. If the size of this is small, caching on the client is an option. Otherwise, a remote API call would be required in order to perform the conversion.
