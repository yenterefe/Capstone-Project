import "./marketPopup.css";

function PopupMarket(props) {
    return (
        <div className="popupMarket">
            <h1>Fresh market: {props.marketName}</h1>
            <h1>Address: {props.address} </h1>
        </div>

    )
}

export default PopupMarket;