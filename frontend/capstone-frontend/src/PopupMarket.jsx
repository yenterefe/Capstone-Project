import "./marketPopup.css";

function PopupMarket(props) {
    return (
        <div className="popupMarket">
            <h1> {props.marketName}</h1>
            <h1>{props.address} </h1>
        </div>

    )
}

export default PopupMarket;