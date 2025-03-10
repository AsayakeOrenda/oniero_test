import React, {FC, ReactElement} from 'react';
import onieroLogo from '../assets/oneiro_logo.png'

type Props = {
    text: string,
}

const Header: FC<Props> = ({text}):ReactElement => {
    return (
    <>
        <header className="w-full h-[106px] flex justify-between items-center p-2 ml-auto mr-auto lg:max-w-[95%]" data-testid="page-header">
            <a href="/" className="max-h-[106px]">
                {/* TODO replace with CSS border linear gradient - optimisation */}
                <img className="max-h-[106px]" src={onieroLogo} alt="Oneiro solutions" loading="eager" decoding="async" data-loader="raw" />
            </a>
            <h1 className="self-end pb-2" >
            {text}
            </h1>
        </header>
        <img className="h-0.5" alt="" src="https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg" width="2500" height="1407" sizes="(max-width: 799px) 200vw, 100vw" srcSet="https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=2500w 2500w" loading="eager" decoding="async"></img>
    </>
    );
};

export default React.memo(Header);
