import React, {FC, ReactElement} from 'react';

const Footer: FC = ():ReactElement => {
    return (
    <>
        <footer className="w-full h-[80px] fixed left-0 bottom-0 bg-[var(--brand-primary)]" data-testid="page-footer" >
            <img className='block object-center object-cover h-[80px] w-full' alt="" src="https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg" width="2500" height="1407" sizes="(max-width: 799px) 200vw, 100vw" srcSet="https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=100w 100w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=300w 300w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=500w 500w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=750w 750w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=1000w 1000w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=1500w 1500w, https://images.squarespace-cdn.com/content/v1/603423c54496e84deaeea1ea/1619783995172-RDN2H6PPHJDYVR0KKL2V/home-background-image-v2.jpg?format=2500w 2500w" loading="eager" decoding="async"></img>
            <div className='absolute bottom-0 right-0 p-2 text-sm'>
                <p className="">
                    Submission by
                </p>
                <p className="pb-2 font-semibold">
                    Marie Payne
                </p>
            </div>
        </footer>
        </>
    );
};

export default React.memo(Footer);
