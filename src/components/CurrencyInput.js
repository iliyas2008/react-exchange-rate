import propTypes, { func }  from "prop-types";
export default function CurrencyInput({
    amount,
    currency,
    currencyArr,
    onCurrencyChange,
    onAmountChange,
    ...props
}){
    return(
        <div className="group">
        <span className="custom-dropdown">
            <select value={currency} onChange={e=>onCurrencyChange(e)}>
                {currencyArr.map((currency=>
                    (<option value={currency} key={currency}>{currency.toUpperCase()}</option>
                )))}
            </select>
            <input 
            className="custom-input"
            type="number"
            value={amount}
            min={1}
            onChange={e=>onAmountChange(e)}
            />
            </span>
        </div>
    )
}

CurrencyInput.prototype = {
    amount: propTypes.number.isRequired,
    currency: propTypes.string.isRequired,
    currencyArr: propTypes.array,
    onAmountChange: func,
    onCurrencyChange: func,
}