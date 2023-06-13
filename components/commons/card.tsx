import { CardType } from "@/enums/card-type";

interface ICard {
    type: CardType;
    className: string
    children: string | JSX.Element | JSX.Element[];
}
const Card = (props: ICard) => {

    return (
        <>
            {props.type === CardType.Small &&
                (<div className={props.className}>
                    {props.children}
                </div>
                )}
        </>
    )
}
export default Card;