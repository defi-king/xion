"use strict";

// Unpkg imports
let Web3Modal;
let WalletConnectProvider;

let authereum;

// Web3modal instance
let web3Modal;

// Chosen wallet provider given by the dialog window
let provider;

// Address of the selected account
let selectedAccount;

let abiXGT;
let abiXGTStakeMainnet;
let abiDAI;
let abiCDAI;
let abiRouter;
let abiPair;
let abiXGTGenerator;
let abiXDaiHelper;
let abiAMBHelper;
let abiAMBMainnet;
let abiDAIBridgeMainnet;
let abiOracle;
let addressXGT;
let addressXGTBSC = "0x0bbd11dd1db6302faf0f318abe84661a52f7bc2c";
let addressXGTStakeMainnet;
let oracleGas = "0x169E633A2D1E6c10dD91238Ba11c4A708dfEF37C";
let oracleEthDai = "0x773616E4d11A78F511299002da57A0a94577F1f4";

let addressDAI;

let addressCDAI;

let addressRouter;

let addressWETH;

let addressPair;

let addressXGTGenerator;

let addressXDaiHelper;

let addressDAIBridgeMainnet;

let addressDAIBridgeXDai;

let abiEIP712;

let web3;

let web3xDai;
let web3Mainnet;
let web3bsc;

let combinedAPY = 0;
let lpAPY = 0;
let lpAPM = 0;

let bnbPrice = 0;

let currentRight = "0";
let currentLeft = "0";
let fixedLeft = true;

let xgtPrice = 0;
let lpRatio;
let lpValue = 0;
let lpShares = 0;
let lpTotalShares = 0;
let lpReserve = 0;
let lpXDai = 0;
let lpXGT = 0;
let tvl = 0;
let tvlCheckRunning = false;

let gBalanceXDai;
let gBalanceXGTXDai;
let gBalanceXGTETH;
let gBalanceXGTBSC;
let gBalanceDAI;
let gBalanceBNB;

let stakeValue = 0;

let INIT_DONE = false;
let VALUES_LOADED = false;

let swapId = 0;
let withdrawId = 1;
let unclaimedXGT;
let halfXGTAmount

let txUrlMainnet;
let txUrlXDai;

let mainnet, mainnetId, mainnetRpc;
let xdai, xdaiId, xdaiRpc;

let decimalsCDai = 8;
let decimalsDai;

let paySelf = true;
let withdrawHash = null;
let swapHash = null;
let swapMessageId = null;
let swapEncodedData = null;

let firstConnect = false;

let metaTxAPI;
let permitTxAPI;

let torusId;
let torusHost;
let domainData;

let migrationXGTbalance;

let latestInfo
let latestInfoRequest

// if (window.location.href.indexOf("binbash") != -1) {
//     domainData = {
//         name: "XGTStake",
//         version: "1",
//         chainId: 42,
//         verifyingContract: "0x6eC71fBb3945C4cE2Decb7c5a4AE8Da7A947424c"
//     };
//     metaTxAPI = "https://dev.binbash.sh/metatx-api/metatx";
//     decimalsDai = 6;
//     mainnet = "Kovan Network";
//     mainnetId = 42;
//     mainnetRpc = "https://kovan.infura.io/v3/0a377d98f2ac47fe9dcc44f8ec660256";
//     xdai = "Sokol Network";
//     xdaiId = 77;
//     xdaiRpc = "https://sokol.poa.network";
//     txUrlMainnet = "https://kovan.etherscan.io/tx/";
//     txUrlXDai = "https://blockscout.com/poa/sokol/tx/";
//     torusId = xdaiId;
//     torusHost = "https://sokol.poa.network";
//     addressXGT = "0x455da55370E3815cE1468Bc6B6a75FF669e73116";

//     addressXGTStakeMainnet = "0x6eC71fBb3945C4cE2Decb7c5a4AE8Da7A947424c";

//     addressDAI = "0xb7a4f3e9097c08da09517b5ab877f7a917224ede";

//     addressCDAI = "0x4a92e71227d294f041bd82dd8f78591b75140d63";

//     addressRouter = "0x278F4d93c544338D389490FbCb0ef865119FE31C";

//     addressWETH = "0x846b00E989aE5C6ba590743fcc82703FCA446Ae0";

//     addressPair = "0xc162675B8c38397C51Ae32C74364c243E517dcd4";

//     addressXGTGenerator = "0xfc6776C5eDc6406588a31f525ce6B5CC87b73476";

//     addressXDaiHelper = "0x6A92e97A568f5F58590E8b1f56484e6268CdDC51";

//     addressDAIBridgeMainnet = "0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016";

//     addressDAIBridgeXDai = "0x7301CFA0e1756B71869E93d4e4Dca5c7d0eb0AA6";

// } else {
domainData = {
    name: "XGTStake",
    version: "1",
    chainId: 1,
    verifyingContract: "0xa294A842A34ab045ddb1E6eE07c417a1e13c2eDf"
};
metaTxAPI = "https://xion.finance/metatx-api/metatx";
permitTxAPI = "https://xion.finance/metatx-api/permittx";
decimalsDai = 18;
mainnet = "Ethereum Mainnet";
mainnetId = (1).toString(16);
mainnetRpc = "https://xion.finance/eth-rpc";
let bsc = "Binance Smart Chain";
let bscRpc = "https://xion.finance/bsc-rpc";
let bscId = (97).toString(16);
xdai = '<u><a href="faq?switchToxDai" target="_blank">xDAI Network</a></u>';
xdaiId = (100).toString(16);
xdaiRpc = "https://xion.finance/xdai-rpc";
let xdaiRpcFallback = "https://xdai-archive.blockscout.com";
txUrlMainnet = "https://etherscan.io/tx/";
txUrlXDai = "https://blockscout.com/poa/xdai/tx/";
torusId = parseInt(xdaiId, 16);
torusHost = xdaiRpcFallback;
addressXGT = "0xf1738912ae7439475712520797583ac784ea9033";
addressXGTStakeMainnet = "0xa294A842A34ab045ddb1E6eE07c417a1e13c2eDf";
addressDAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
addressCDAI = "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643";
addressRouter = "0x1C232F01118CB8B424793ae03F870aa7D0ac7f77";
let addressRouterOLD = "0x5170Bdae56b22D96721E7867aa296802ED498Ec0"
addressWETH = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"; //
addressPair = "0xB2B15DaE735e52CA0902824570Bd2458d78672f8"; //
let addressPairOLD = "0x2745aA5c196bb8eCdBc43A1b15dFCC1f3a711611";
let addressPairUniETH = "0x6545662aacbd34b36123ff4850905bcaea3635ad"
addressXGTGenerator = "0xa294A842A34ab045ddb1E6eE07c417a1e13c2eDf";
addressXDaiHelper = "0x6A92e97A568f5F58590E8b1f56484e6268CdDC51";
let addressAMBHelper = "0x7d94ece17e81355326e3359115D4B02411825EdD";
let addressAMBMainnet = "0x4c36d2919e407f0cc2ee3c993ccf8ac26d9ce64e";
addressDAIBridgeMainnet = "0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016";
addressDAIBridgeXDai = "0x7301CFA0e1756B71869E93d4e4Dca5c7d0eb0AA6";

const domainType = [{
        name: "name",
        type: "string"
    },
    {
        name: "version",
        type: "string"
    },
    {
        name: "chainId",
        type: "uint256"
    },
    {
        name: "verifyingContract",
        type: "address"
    }
];

const metaTransactionType = [{
        name: "nonce",
        type: "uint256"
    },
    {
        name: "from",
        type: "address"
    },
    {
        name: "functionSignature",
        type: "bytes"
    }
];

let daiSymbol = '<g> <g> <path fill="#f9b52c" d="M43.025 43.507c-2.612 2.107-5.599 3.285-8.92 3.678-1.367.16-2.732.17-4.102.17-3.6-.002-7.2-.007-10.8.007-.4.002-.512-.118-.509-.512.013-1.926-.002-3.852-.007-5.78.06-1.307.07-2.615-.006-3.923-.009-.064-.047-.087-.109-.077-1.306-.005-2.613-.022-3.918-.007-.36.004-.469-.107-.462-.462.021-.971.017-1.943.003-2.914-.004-.292.091-.384.383-.381 1.242.014 2.485-.005 3.728.013.338.006.434-.098.428-.43a83.897 83.897 0 0 1-.002-3.01c.006-.354-.078-.5-.475-.49-1.21.027-2.422-.002-3.632.017-.332.006-.437-.085-.429-.423.022-.955.023-1.911.001-2.866-.008-.353.088-.468.453-.461 1.195.023 2.391-.006 3.585.017.378.007.482-.108.481-.484-.007-3.137.016-6.274.004-9.412-.002-.427.117-.522.531-.521 4.238.016 8.476-.014 12.714.016 4.298.032 8.181 1.282 11.473 4.12a14.587 14.587 0 0 1 4.13 5.873c.118.305.25.414.578.408 1.067-.022 2.135.002 3.202-.015.313-.005.41.088.404.402-.018.987-.02 1.975.002 2.962.008.337-.126.388-.416.382-.796-.016-1.593.008-2.39-.012-.3-.007-.398.088-.358.38.14 1.048.101 2.098-.01 3.144-.037.335.09.407.394.4.78-.015 1.561.01 2.341-.011.32-.008.447.064.44.414a73.12 73.12 0 0 0-.003 2.962c.005.293-.085.384-.378.38-1.083-.015-2.167.006-3.25-.013-.34-.006-.549.05-.67.419-.266.798-.702 1.522-1.088 2.266-.952 1.4-2.014 2.703-3.34 3.774zm-20.652.124c-.002.25.081.325.328.324 3.307-.014 6.615-.02 9.923-.026a13.493 13.493 0 0 0 3.152-.481c3.364-.931 5.97-2.846 7.66-5.938.248-.457.245-.462-.249-.462-6.786-.001-13.572-.001-20.358.003-.147 0-.323-.076-.437.095-.005 2.162-.007 4.323-.019 6.485zM43.19 25.664c.52 0 .517-.007.282-.452-.708-1.337-1.617-2.515-2.773-3.494-2.557-2.167-5.562-3.08-8.865-3.104-2.995-.022-5.99.004-8.984-.015-.417-.002-.495.137-.492.517.018 1.99.023 3.98 0 5.972-.006.449.093.59.568.588 3.362-.022 6.723-.011 10.084-.011l10.18-.001zm1.053 7.66c.472.004.6-.167.615-.583.037-.94.046-1.88-.003-2.818-.018-.361-.106-.546-.557-.538-1.959.033-3.919.014-5.879.014-5.194 0-10.389.004-15.583-.008-.377-.001-.485.099-.475.476.027.987.032 1.975.001 2.962-.013.415.132.493.514.49 3.57-.013 7.14-.007 10.708-.007 3.553 0 7.106-.011 10.66.013z" /> </g> <g> <path fill="none" stroke="#f9b52c" stroke-miterlimit="20" d="M62.21 31.717c0 16.885-13.687 30.573-30.572 30.573-16.885 0-30.573-13.688-30.573-30.573 0-16.885 13.688-30.573 30.573-30.573 16.885 0 30.573 13.688 30.573 30.573z" /> </g> </g>';
let xdaiSymbol = '<g> <g> <path fill="#47a8a5" d="M21.316 48.977c-1.966 0-3.933-.024-5.898.014-.64.012-.877-.134-.87-.83.033-3.963.03-7.925.002-11.887-.005-.623.166-.813.795-.797 1.756.041 3.514.03 5.272.003.508-.007.665.152.657.658-.026 1.728.04 3.458-.03 5.182-.034.828.25.991 1.008.967 1.696-.056 3.396.003 5.093-.029.545-.01.72.143.708.7a140.386 140.386 0 0 0 0 5.272c.01.58-.158.77-.75.76-1.995-.034-3.99-.013-5.987-.013z" /> </g> <g> <path fill="#47a8a5" d="M48.306 42.219c0 1.997-.015 3.994.01 5.99.007.559-.135.783-.742.78-4.022-.023-8.045-.022-12.068-.001-.559.003-.706-.181-.697-.717a168.27 168.27 0 0 0 0-5.364c-.007-.52.17-.654.666-.647 1.727.025 3.457-.024 5.185.026.72.02.986-.143.959-.92-.062-1.725 0-3.456-.032-5.184-.01-.548.15-.714.702-.704 1.758.034 3.517.035 5.274 0 .583-.01.765.16.756.75-.034 1.997-.013 3.994-.013 5.99z" /> </g> <g> <path fill="#47a8a5" d="M21.326 21.935c-1.997 0-3.994-.015-5.991.01-.544.006-.8-.098-.785-.725.04-1.758.031-3.517.004-5.275-.009-.53.135-.725.697-.722 4.024.021 8.048.018 12.072.002.513-.002.742.1.731.681-.036 1.787-.038 3.576.001 5.364.012.593-.232.68-.738.674-1.997-.022-3.994-.009-5.991-.009z" /> </g> <g> <path fill="#47a8a5" d="M41.559 15.234c1.998 0 3.996.018 5.993-.011.574-.008.778.157.767.75a136.568 136.568 0 0 0 0 5.279c.01.573-.206.694-.73.692-4.025-.017-8.051-.02-12.076.002-.546.003-.715-.154-.704-.704.03-1.788.028-3.578 0-5.366-.007-.517.17-.657.667-.651 2.028.023 4.056.009 6.083.009z" /> </g> <g> <path fill="none" stroke="#47a8a5" stroke-miterlimit="20" d="M62.22 31.765c0 16.885-13.689 30.573-30.574 30.573S1.073 48.65 1.073 31.765c0-16.885 13.688-30.573 30.573-30.573 16.885 0 30.573 13.688 30.573 30.573z" /> </g> </g>';
let usdSymbol = '<g> <g> <path fill="#f9c045" d="M28.706 11.282c1.695.686 3.284 1.314 4.858 1.975.49.206.628.679.635 1.176.01.698.042 1.4-.011 2.094-.042.56.149.735.699.806 1.715.223 3.33.764 4.774 1.746 1.569 1.069 2.59 2.52 2.994 4.382.034.159-.037.456-.148.512-1.633.825-3.281 1.619-4.957 2.435-.065-.123-.127-.204-.152-.295-.775-2.788-2.65-4.216-5.55-4.215-1.145 0-2.225.244-3.14.972-2.153 1.715-1.986 4.785.416 6.137.953.536 2.079.777 3.144 1.096 2.055.615 4.14 1.134 6.18 1.794 3.238 1.048 4.787 3.336 4.842 6.723.08 4.953-3.438 8.442-7.298 9.54-.353.1-.706.199-1.062.284-.728.175-.727.17-.727.946l-.002 5.396v.613c-.25-.085-.424-.133-.59-.201-1.291-.53-2.573-1.084-3.875-1.587-.757-.293-1.096-.791-1.073-1.596.026-.96-.015-1.922.018-2.881.014-.417-.127-.56-.53-.647-2.085-.447-4.075-1.203-5.48-2.85-1.065-1.247-1.853-2.732-2.745-4.124-.054-.084.015-.361.1-.404 1.662-.844 3.336-1.666 5.037-2.508.045.067.09.107.1.154.533 2.205 2.024 3.396 4.154 3.865 1.713.378 3.406.382 4.96-.597 1.387-.874 2.063-2.39 1.672-3.805-.377-1.365-1.402-2.117-2.68-2.488-1.371-.397-2.776-.676-4.171-.988-1.622-.362-3.236-.743-4.676-1.623-2.247-1.373-3.313-3.511-3.835-5.99-.358-1.695-.305-3.378.332-4.997.989-2.511 3.009-3.806 5.498-4.493.586-.162 1.193-.257 1.797-.342.34-.047.466-.17.462-.53-.018-1.588-.007-3.177-.004-4.766 0-.202.018-.404.034-.72z"> </path> </g> <g> <path fill="none" stroke="#f9c045" stroke-miterlimit="20" d="M62.284 31.851c0 16.885-13.688 30.573-30.573 30.573-16.885 0-30.573-13.688-30.573-30.573 0-16.885 13.688-30.573 30.573-30.573 16.885 0 30.573 13.688 30.573 30.573z"> </path> </g> </g>';
let xgtSymbol = '<g> <g> <path fill="#29a5dc" d="M24.655 27.155c-2.07 2.356-2.049 3.89.01 6.26 7.052 8.119 14.111 16.234 21.16 24.357 9.4-5.177 15.77-15.177 15.77-26.666 0-11.814-6.735-22.056-16.575-27.095-6.786 7.716-13.584 15.423-20.365 23.144z" /> </g> <g> <path fill="#fcfcfc" d="M56.798 24.685l-.35 1.989a.871.871 0 0 1-.857.72c-3.157-.001-15.411-.006-16.273.003-2.077.024-4.043 2.012-4.052 4.085-.006 1.42 1.043 2.556 2.459 2.64.458.029 4.64.026 5.099.012.1-.003.267-.101.284-.18.123-.588.216-1.182.324-1.811h-3.025c.162-.925.315-1.81.472-2.713h5.752L45.34 36.8c-.037.023-3.78.046-3.8.046-1.7-.031-3.416.205-5.098-.146-1.864-.38-3.741-2.28-3.856-4.432-.166-3.101 1.313-5.282 3.922-6.776 1.014-.58 2.127-.831 3.303-.811 1.173.019 16.804.004 16.987.004z" /> </g> <g> <path fill="#fcfcfc" d="M49.351 29.404l-.719 4.046c-.198 1.115-.391 2.23-.593 3.39.886 0 1.32.007 2.175-.013.07 0 .597.011.705-.618.408-2.383.758-4.423 1.168-6.805z" /> </g> <g> <path fill="#f0f" d="M17.82 40.166c-1.555-1.773-3.27-1.725-4.896.052-2.365 2.586-4.69 5.207-7.027 7.821 5.461 8.134 14.743 13.488 25.276 13.488a30.61 30.61 0 0 0 4.895-.394C29.991 54.14 23.93 47.131 17.82 40.166z" /> </g> <g> <path fill="#29a5dc" d="M12.536 19.773c2.12 2.418 3.736 2.402 5.883-.058C23.889 13.449 29.352 7.174 34.817.902a30.853 30.853 0 0 0-3.643-.218c-10.042 0-18.947 4.867-24.487 12.37 1.946 2.242 3.89 4.487 5.849 6.719z" /> </g> <g> <path fill="#f0f" d="M6.825 27.96c-.086-.114-3.016-3.127-4.943-5.095a30.441 30.441 0 0 0-1.13 8.241c0 2.65.34 5.222.977 7.673 2.02-2.436 4.552-5.419 5.064-6.057 1.308-1.63 1.29-3.09.032-4.762z" /> </g> <g> <path fill="none" stroke="#29a5dc" stroke-linecap="round" stroke-miterlimit="20" d="M42.725 3.813c-6.787 7.716-13.584 15.423-20.366 23.144-2.069 2.356-2.049 3.891.009 6.26 7.053 8.12 14.112 16.234 21.162 24.356" /> </g> <g> <path fill="none" stroke="#f0f" stroke-linecap="round" stroke-miterlimit="20" d="M3.92 38.854c2.021-2.436 4.552-5.418 5.064-6.057 1.308-1.63 1.29-3.09.032-4.762-.04-.054-.724-.764-1.638-1.704" /> </g> <g> <path fill="none" stroke="#f0f" stroke-linecap="round" stroke-miterlimit="20" d="M36.242 58.45c-6.077-6.993-12.14-14-18.248-20.966-1.555-1.774-3.271-1.725-4.896.052" /> </g> </g>';

/**
 * Setup the orchestra
 */
async function init(connect) {
    while (typeof window.WalletConnectProvider == "undefined" || typeof window.Web3Modal == "undefined" || typeof Authereum == "undefined" || typeof Web3 == "undefined") {
        await sleep(75);
    }

    Web3Modal = window.Web3Modal.default;
    WalletConnectProvider = window.WalletConnectProvider.default
    authereum = Authereum;

    if (location.protocol !== "https:") {
        return;
    }

    if (!$(".web3modal-provider-container:contains('RECOMMENDED')").length) {
        $(".web3modal-provider-name:contains('Torus')").parent().prepend("<strong>RECOMMENDED WALLET</strong><br>");
        // let oldOnClick = $(".web3modal-provider-name:contains('Torus')").parent().parent().onclick;
        $(".web3modal-provider-name:contains('Torus')").parent().parent().on("click", function () {
            showTorusLoader();
            // oldOnClick();
        });
    }
    web3Mainnet = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/0a377d98f2ac47fe9dcc44f8ec660256"));
    try {
        web3xDai = new Web3(new Web3.providers.HttpProvider(xdaiRpc));
        await web3xDai.eth.getChainId();
    } catch (e) {
        web3xDai = new Web3(new Web3.providers.HttpProvider(xdaiRpcFallback));
        torusHost = xdaiRpcFallback;
    }
    web3bsc = new Web3(new Web3.providers.HttpProvider(bscRpc));
    await web3bsc.eth.getChainId();

    let providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "0a377d98f2ac47fe9dcc44f8ec660256",
            },
        },
        torus: {
            package: Torus,
            display: {
                description: "Sign in or create an account"
            },
            options: {
                networkParams: {
                    host: torusHost, // optional
                    chainId: torusId, // optional
                    networkId: torusId // optional
                },
                config: {
                    buttonPosition: "bottom-left",
                    showTorusButton: true,
                    enableLogging: false,
                    integrity: {
                        check: false,
                        version: '1.9.19',
                    }
                }
            },
        },
        authereum: {
            package: authereum
        },
    };

    web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false,
    });

    await $.getJSON("js/abis/XGTStakeMainnet.json", function (json) {
        abiXGTStakeMainnet = json;
    });

    await $.getJSON("js/abis/DAI.json", function (json) {
        abiDAI = json;
    });

    await $.getJSON("js/abis/cDAI.json", function (json) {
        abiCDAI = json;
    });

    await $.getJSON("js/abis/UniswapRouter.json", function (json) {
        abiRouter = json;
    });

    await $.getJSON("js/abis/ERC20.json", function (json) {
        abiXGT = json;
    });

    await $.getJSON("js/abis/Pair.json", function (json) {
        abiPair = json;
    });

    await $.getJSON("js/abis/XGTGenerator.json", function (json) {
        abiXGTGenerator = json;
    });

    await $.getJSON("js/abis/EIP712.json", function (json) {
        abiEIP712 = json;
    });

    await $.getJSON("js/abis/xDaiHelper.json", function (json) {
        abiXDaiHelper = json;
    });

    await $.getJSON("js/abis/bridge.json", function (json) {
        abiDAIBridgeMainnet = json;
    });

    await $.getJSON("js/abis/Oracle.json", function (json) {
        abiOracle = json;
    });

    await $.getJSON("js/abis/AMBHelper.json", function (json) {
        abiAMBHelper = json;
    });

    await $.getJSON("js/abis/AMBMainnet.json", function (json) {
        abiAMBMainnet = json;
    });

    getTVL();
    if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER") != null || connect) {
        await onConnect();
    } else {
        // await getXGTPrice();
        await getIndependentData();
        if (typeof HelpHero != "undefined") {
            HelpHero.anonymous();
        }
    }
}

async function fetchAccountData() {
    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];
    await getInfo(true)
    if (typeof HelpHero != "undefined") {
        HelpHero.identify(selectedAccount);
    }

    $("#connect-wallet").text("CONNECTED");
}
async function getIndependentData() {
    while (typeof latestInfo == "undefined") {
        await sleep(30)
    }
    // await getInfo()
    // let cDaiContract = new web3Mainnet.eth.Contract(abiCDAI, addressCDAI, null);
    // let exchangeRate = await cDaiContract.methods.supplyRatePerBlock().call();
    // let apy = ((((((exchangeRate / 10 ** 18) * (4 * 60 * 24)) + 1) ** (365 - 1)) - 1) * 100);
    // let XGTGeneratorContract = new web3xDai.eth.Contract(abiXGTGenerator, addressXGTGenerator, null);
    // let xgtGenerationRateStake = await XGTGeneratorContract.methods.xgtGenerationRateStake().call();
    // let xgtPer100Stake = new Big(xgtGenerationRateStake.toString()).mul(new Big("100")).mul(new Big((365 * 24 * 60 * 60).toString())).div(new Big(10 ** 18)).mul(xgtPrice);
    // combinedAPY = (apy + parseFloat(xgtPer100Stake.toString())) / 100 / 12;
    combinedAPY = latestInfo.apy_stake / 100 / 12;
    if ($("#rewards_week_interest").length) {
        $("#rewards_week_interest").removeClass("pulsing");
        $("#rewards_week_interest").html(
            (latestInfo.apy_stake).toFixed(2) + " %"
        );
    }

    // let pairContract = new web3xDai.eth.Contract(abiPair, addressPair, null);
    // let res;
    // let reserveXGT = "0";
    // let reserveXDAI = "0";
    // try {
    //     res = await pairContract.methods.getReserves().call();
    //     if (new Big(res["1"]).gt(new Big(res["0"]))) {
    //         reserveXDAI = res["0"];
    //         reserveXGT = res["1"];
    //     } else {
    //         reserveXDAI = res["1"];
    //         reserveXGT = res["0"];;
    //     }
    // } catch (e) {
    //     console.log(e)
    // }

    // let totalSupply = await pairContract.methods.totalSupply().call();
    // if (new Big(totalSupply).eq(new Big("0"))) {
    //     lpValue = web3xDai.utils.fromWei("0");
    //     return
    // }
    lpTotalShares = new Big(latestInfo.total_pool_tokens[0]).mul(new Big(10 ** 18))
    lpReserve = new Big(latestInfo.total_pool_value[0] / 2).mul(new Big(10 ** 18))
    // lpReserve = reserveXDAI;
    // let lpPer100 = new Big(lpTotalShares.toString()).mul(new Big(100)).div((new Big(lpReserve.toString()).mul(new Big(2))))

    // let xgtGenerationRateLP = await XGTGeneratorContract.methods.xgtGenerationRatePool().call();

    // let xgtPer100Pool = new Big(xgtGenerationRateLP.toString()).mul(lpPer100).mul(new Big((365 * 24 * 60 * 60).toString())).div(new Big(10 ** 18)).mul(xgtPrice);
    let xgtPer100Pool = latestInfo.apy_pool
    lpAPY = xgtPer100Pool.toFixed(2).toString();
    if ($("#rewards_week").length) {
        $("#rewards_week").removeClass("pulsing");
        $("#rewards_week").html(
            lpAPY + " %"
        );
    }

    lpAPM = (parseFloat(xgtPer100Pool.toString())) / 100 / 12;

    await getCurrentRatio();
    VALUES_LOADED = true;
    $(".preloader").hide();
}

async function refreshBalance() {
    let daiContract = new web3Mainnet.eth.Contract(
        abiDAI,
        addressDAI,
        null
    );
    let balanceDai = await daiContract.methods.balanceOf(selectedAccount).call();
    gBalanceDAI = parseFloat((new Big(balanceDai.toString()).div(new Big(10 ** decimalsDai))).toFixed(2).toString());
    let balanceXDai = await web3xDai.eth.getBalance(selectedAccount);
    gBalanceXDai = parseFloat((new Big(balanceXDai.toString()).div(new Big(10 ** 18))).toFixed(2).toString());
    let balanceBNB = await web3bsc.eth.getBalance(selectedAccount);
    while (bnbPrice <= 0) {
        await sleep(30)
    }
    balanceBNB = new Big(balanceBNB.toString()).mul(new Big(bnbPrice)).toFixed(0).toString();
    gBalanceBNB = parseFloat((new Big(balanceBNB.toString()).div(new Big(10 ** 18))).toFixed(2).toString());

    let combined = new Big(balanceDai.toString()).mul(new Big(10 ** (18 - decimalsDai))).add(new Big(balanceXDai.toString())).add(new Big(balanceBNB.toString())).toFixed(0).toString();

    let xgtContract = new web3xDai.eth.Contract(
        abiXGT,
        addressXGT,
        null
    );
    let xgtContractMainnet = new web3Mainnet.eth.Contract(
        abiXGT,
        addressXGT,
        null
    );
    let xgtContractBSC = new web3bsc.eth.Contract(
        abiXGT,
        addressXGTBSC,
        null
    );
    let balanceXGT = await xgtContract.methods.balanceOf(selectedAccount).call();
    gBalanceXGTXDai = parseFloat((new Big(balanceXGT.toString()).div(new Big(10 ** 18))).toFixed(2).toString());
    let balanceXGTMainnet = await xgtContractMainnet.methods.balanceOf(selectedAccount).call();
    gBalanceXGTETH = parseFloat((new Big(balanceXGTMainnet.toString()).div(new Big(10 ** 18))).toFixed(2).toString());
    let balanceXGTBSC = await xgtContractBSC.methods.balanceOf(selectedAccount).call();
    gBalanceXGTBSC = parseFloat((new Big(balanceXGTBSC.toString()).div(new Big(10 ** 18))).toFixed(2).toString());

    if (gBalanceXGTXDai > 0 && $("#provideLiquidityXGT").length) {
        $("#xgt").prop("disabled", false);
    }
    let xgtGenerator = new web3xDai.eth.Contract(abiXGTGenerator, addressXGTGenerator, null);
    unclaimedXGT = await xgtGenerator.methods.getUnclaimedXGT(selectedAccount).call();
    if ($("#claimXGT").length) {
        $("#claimXGT").html(parseFloat((new Big(unclaimedXGT.toString()).div(new Big(10 ** 18))).toString()).toFixed(2).toString() + " XGT")
        if (!$("#claimXGTSpan").is(":visible")) {
            $("#claimXGTSpan").show();
            $("#xgtBalanceSpan").show();
        }
        $("#xgtBalance").html(parseFloat(parseFloat(gBalanceXGTXDai) + parseFloat(gBalanceXGTETH)).toFixed(2).toString() + " XGT")
    }

    let totalXGT = (new Big(balanceXGT.toString()).add(balanceXGTMainnet.toString()).add(balanceXGTBSC.toString()).add(new Big(unclaimedXGT.toString()))).mul(new Big(xgtPrice)).toFixed(0);
    $("#xgt-balance").html(parseFloat(web3xDai.utils.fromWei(totalXGT.toString())).toFixed(2));
    $("#balance").html(parseFloat(web3Mainnet.utils.fromWei(combined)).toFixed(2));

    await getLPValue();
    getStakeValue();
    if (window.location.href.indexOf("earn") > -1) {
        // do nothing
    } else if (window.location.href.indexOf("farm") > -1) {
        setLPValue();
    } else {
        setAllValues();
    }
    await getIndependentData();
}

async function torusSwitch() {
    $(".preloader").show();
    await onDisconnect()
    torusId = 1;
    torusHost = "https://xion.finance/eth-rpc";
    torusHost = "";
    await init();
    $(".preloader").hide();
}
async function getXGTPrice() {
    // while (xgtPrice <= 0) {
    //     await sleep(75);
    // }
    // let routerContract = new web3xDai.eth.Contract(abiRouter, addressRouter, null);
    // try {
    //     let rate = await routerContract.methods
    //         .getAmountsOut(web3xDai.utils.toWei("1", "ether"), [addressXGT, addressWETH])
    //         .call();
    //     xgtPrice = parseFloat(web3xDai.utils.fromWei(rate[1]))
    //     if ($("#xgtPrice").length) {
    //         $("#xgtPrice").html("$" + xgtPrice.toFixed(3).toString())
    //     }

    // } catch (e) {
    //     xgtPrice = parseFloat("0")
    // }
}

async function getInfo(withUser) {
    let oldLatestInfoRequest = latestInfoRequest

    if (typeof oldLatestInfoRequest == "undefined") {
        oldLatestInfoRequest = 0
    }
    if (Date.now() - oldLatestInfoRequest <= 2000 && !withUser) {
        return
    }
    latestInfoRequest = Date.now()
    oldLatestInfoRequest = Date.now()
    let url = "https://" + window.location.href.split("/")[2] + "/metatx-api/info";
    const data = {
        "user": selectedAccount
    };
    const other_params = {
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
        method: "POST",
    };

    fetch(url, other_params)
        .catch(function () {
            console.log("ERROR ON FETCH")
        })
        .then(response => response.json())
        .catch(function () {
            console.log("ERROR ON FETCH")
        })
        .then(json => {
            latestInfo = json
            latestInfoRequest = Date.now()
        })
    while (oldLatestInfoRequest == latestInfoRequest) {
        await sleep(30)
    }
    return
}

async function getTVL() {
    if (!tvlCheckRunning) {
        // let routerContract = new web3xDai.eth.Contract(abiRouter, addressRouter, null);
        // let stakeContract = new web3Mainnet.eth.Contract(abiXGTStakeMainnet, addressXGTStakeMainnet, null);
        // let pairContract = new web3xDai.eth.Contract(abiPair, addressPair, null);
        // let pairContract2 = new web3xDai.eth.Contract(abiPair, "0xada20ef617daecb5ab143d18570d12549d66c639", null);
        // let pairContractUniETH = new web3Mainnet.eth.Contract(abiPair, addressPairUniETH, null);
        while (true == true) {
            tvlCheckRunning = true;
            //xgtPrice
            // tvl
            let oldTVL = tvl
            let oldXgtPrice = xgtPrice
            await getInfo()
            while (typeof latestInfo == "undefined") {
                await sleep(30)
            }

            tvl = latestInfo.tvl
            xgtPrice = latestInfo.xgt_price
            bnbPrice = latestInfo.bnb_price

            // let rate = await routerContract.methods
            //     .getAmountsOut(web3xDai.utils.toWei("1", "ether"), [addressXGT, addressWETH])
            //     .call();
            // xgtPrice = parseFloat(web3xDai.utils.fromWei(rate[1]))
            // if ($("#xgtPrice").length) {
            //     $("#xgtPrice").html("$" + xgtPrice.toFixed(3).toString())
            // }
            // let oldTVL = tvl
            // let oldXgtPrice = xgtPrice
            // let totalDAI = await stakeContract.methods.totalDeposits().call();
            // tvl = parseFloat(new Big(totalDAI).div(new Big(10 ** decimalsDai)).toString())

            // let res = await pairContract.methods.getReserves().call();
            // let reserveXGT, reserveXDAI;
            // if (new Big(res["1"]).gt(new Big(res["0"]))) {
            //     reserveXDAI = res["0"];
            //     reserveXGT = res["1"];
            // } else {
            //     reserveXDAI = res["1"];
            //     reserveXGT = res["0"];
            // }
            // let tvlLP1 = ((new Big(reserveXDAI).mul(new Big(2))).div(new Big(10 ** 18))).toString();
            // let res2 = await pairContract2.methods.getReserves().call();
            // let reserveXGT2, reserveHNY;
            // if (new Big(res["1"]).gt(new Big(res["0"]))) {
            //     reserveHNY = res2["0"];
            //     reserveXGT2 = res2["1"];
            // } else {
            //     reserveHNY = res2["1"];
            //     reserveXGT2 = res2["0"];
            // }
            // let tvlLP2 = (new Big(reserveXGT2).mul(new Big(xgtPrice))).mul(new Big(2)).div(new Big(10 ** 18)).toString();

            // let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
            // let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            // let resUniEth = await pairContractUniETH.methods.getReserves().call();
            // let reserveXGTUniEth, reserveETHUniXGT;
            // if (new Big(resUniEth["1"]).gt(new Big(resUniEth["0"]))) {
            //     reserveXGTUniEth = resUniEth["0"];
            //     reserveETHUniXGT = resUniEth["1"];
            // } else {
            //     reserveXGTUniEth = resUniEth["1"];
            //     reserveETHUniXGT = resUniEth["0"];
            // }
            // let tvlLPUniETH = ((new Big(reserveXGTUniEth).mul(new Big(2))).div(new Big(latestEthDai.toString()))).toString();
            // tvl = parseFloat(tvl + parseFloat(tvlLP1) + parseFloat(tvlLP2) + parseFloat(tvlLPUniETH)).toFixed(0).toString();


            if ($("#tvl").length && oldTVL != tvl) {
                $("#tvl").removeClass("pulsing");
                $("#tvl").html("$ 281,610")
                // $("#tvl").html("$ " + Number(tvl).toLocaleString('en-US'))
            }
            if ($("#xgtPriceXDai").length && oldXgtPrice != xgtPrice) {
                $("#xgtPriceXDai").html("$" + latestInfo.xgt_price_xdai.toFixed(3).toString())
                $("#xgtPriceBSC").html("$" + latestInfo.xgt_price_bsc.toFixed(3).toString())
            }
            if ($(".app-content-line").length && oldTVL != tvl) {
                let reachedPercent = (new Big(tvl).div(new Big("50000000"))).mul(new Big("100")).toFixed(0).toString();
                if (reachedPercent == "0") {
                    reachedPercent = "0.5";
                }
                $(".app-content-line").width(reachedPercent + "%");
            }
            await sleep(10000)
        }
    }
}

async function getLPValue(duringMigration) {
    let share;
    let xdaiShare;
    let xgtShare;
    let ethShares;
    await getInfo(true);
    if (latestInfo.user.toLowerCase() != selectedAccount.toLowerCase()) {
        lpShares = 0
        ethShares = 0
        lpXDai = 0
        xdaiShare = 0
        lpXGT = 0
        xgtShare = 0
        lpValue = 0
    } else {
        for (var i = 0; i < latestInfo.pool_tokens.length; i++) {
            lpShares = lpShares + latestInfo.pool_tokens[i]
        }
        // lpShares = latestInfo.pool_tokens[0] + latestInfo.pool_tokens[1] + latestInfo.pool_tokens[2] + latestInfo.pool_tokens[3]
        ethShares = latestInfo.pool_tokens[2]
        xdaiShare = parseFloat(latestInfo.pool_value_xdai).toFixed(2)
        xgtShare = parseFloat(latestInfo.pool_value_xgt).toFixed(2)
        let xdaiPerLP = parseFloat(latestInfo.total_pool_value[0] / latestInfo.total_pool_tokens[0] / 2)
        lpXDai = new Big(parseFloat(latestInfo.pool_tokens[0] * xdaiPerLP)).mul(new Big(10 ** 18)).toFixed(0)
        lpXGT = new Big(parseFloat((latestInfo.pool_tokens[0] * xdaiPerLP) / latestInfo.xgt_price)).mul(new Big(10 ** 18)).toFixed(0)
        lpValue = parseFloat(latestInfo.pool_value_usd).toFixed(2)
        let lpTotalValue = latestInfo.total_pool_value[0] + latestInfo.total_pool_value[1] + latestInfo.total_pool_value[2] + latestInfo.total_pool_value[3]
        share = parseFloat(latestInfo.pool_value_usd / lpTotalValue * 100).toFixed(2)
    }

    lpTotalShares = latestInfo.total_pool_tokens[0] + latestInfo.total_pool_tokens[1] + latestInfo.total_pool_tokens[2] + latestInfo.total_pool_tokens[3]

    // let pairContract = new web3xDai.eth.Contract(abiPair, addressPair, null);
    // let res;
    // let reserveXGT = "0";
    // let reserveXDAI = "0";
    // try {
    //     res = await pairContract.methods.getReserves().call();
    //     if (new Big(res["1"]).gt(new Big(res["0"]))) {
    //         reserveXDAI = res["0"];
    //         reserveXGT = res["1"];
    //     } else {
    //         reserveXDAI = res["1"];
    //         reserveXGT = res["0"];;
    //     }
    // } catch (e) {
    //     console.log(e)
    // }

    // let totalSupply = await pairContract.methods.totalSupply().call();
    // if (new Big(totalSupply).eq(new Big("0"))) {
    //     lpValue = web3xDai.utils.fromWei("0");
    //     return
    // }
    // lpTotalShares = totalSupply;
    // lpReserve = reserveXGT;
    // let userSupply = await pairContract.methods.balanceOf(selectedAccount).call();
    // lpShares = userSupply;
    // let share = new Big(userSupply).div(new Big(totalSupply));
    // lpXDai = share.mul(new Big(reserveXDAI))
    // lpXGT = share.mul(new Big(reserveXGT))
    // lpValue = web3xDai.utils.fromWei(new Big(share).mul(new Big(reserveXGT)).mul(xgtPrice).add(new Big(share).mul(new Big(reserveXDAI))).toFixed(0).toString());
    // let uniEthPairContract = new web3Mainnet.eth.Contract(abiPair, addressPairUniETH, null);
    // let uniETHLPBalance = await uniEthPairContract.methods.balanceOf(selectedAccount).call();

    if ($("#poolShareSpan").length) {
        if (!$("#poolShareSpan").is(":visible")) {
            $("#poolShareSpan").show();
        }
        // let share = (new Big(lpShares.toString()).div(new Big(lpTotalShares.toString())).mul(new Big(100))).toFixed(2).toString()
        // let xdaiShare = (new Big(reserveXDAI.toString()).mul(new Big(share)).div(new Big(10 ** 20))).toFixed(2).toString();
        // let xgtShare = (new Big(reserveXGT.toString()).mul(new Big(share)).div(new Big(10 ** 20))).toFixed(2).toString();
        $("#poolShare").html(share + "%")
        $("#poolValue").html(xdaiShare + " xDAI + " + xgtShare + " XGT")
    }

    // if (ethShares > 0) {
    //     if (!duringMigration) {
    //         $("#connect-success").removeClass("popup_open")
    //         $("#confirm_farm_migrate_1_4").addClass("popup_open");
    //     }
    // }
    //     let res;
    //     let reserveXGT = "0";
    //     let reserveETH = "0";
    //     try {
    //         res = await uniEthPairContract.methods.getReserves().call();
    //         if (new Big(res["1"]).gt(new Big(res["0"]))) {
    //             reserveETH = res["0"];
    //             reserveXGT = res["1"];
    //         } else {
    //             reserveETH = res["1"];
    //             reserveXGT = res["0"];;
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }

    //     let totalSupply = await uniEthPairContract.methods.totalSupply().call();
    //     if (new Big(totalSupply).eq(new Big("0"))) {
    //         lpValue = web3Mainnet.utils.fromWei("0");
    //         return
    //     }
    //     let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
    //     let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();

    //     let userSupply = await uniEthPairContract.methods.balanceOf(selectedAccount).call();
    //     let share = new Big(reserveETH).mul(new Big(userSupply).div(new Big(totalSupply)));
    //     let uniETHvalue = share.div(latestEthDai.toString()).toString();

    //     // lpValue = (parseFloat(lpValue) + parseFloat(web3xDai.utils.fromWei(new Big(share).mul(new Big(reserveXGT)).mul(xgtPrice).add(new Big(share).mul(new Big(reserveXDAI))).toFixed(0).toString()))).toString();
    //     lpValue = (parseFloat(lpValue) + parseFloat(uniETHvalue)).toString();
    // }

}

function setLPValue() {
    $("#earnings").html(parseFloat(lpValue).toFixed(2));
}

async function tokenAnalytics() {
    currentSupply()
}

async function currentSupply() {
    let xgtContract = new web3xDai.eth.Contract(abiDAI, addressXGT, null);
    let mainnetBalance = await xgtContract.methods.balanceOf(addressXGT).call();
    mainnetBalance = new Big(mainnetBalance.toString()).div(new Big(10 ** 18)).toFixed(0).toString()
    let bscBalance = await xgtContract.methods.balanceOf("0x59447362798334d3485c64D1e4870Fde2DDC0d75").call();
    bscBalance = new Big(bscBalance.toString()).div(new Big(10 ** 18)).toFixed(0).toString()
    let vestingBalance = await xgtContract.methods.balanceOf("0x080Dd0D9A441FA76f67A59260229dBce897148a4").call();
    let genBalance = await xgtContract.methods.balanceOf(addressXGTGenerator).call();
    let currentSupply = ((((new Big("3000000000").mul(new Big(10 ** 18))).sub(new Big(vestingBalance.toString()))).sub(new Big(genBalance.toString()))).div(new Big(10 ** 18))).toFixed(0).toString()
    let mainnetPercent = parseFloat((mainnetBalance * 100) / currentSupply).toFixed(2)
    let bscPercent = parseFloat((bscBalance * 100) / currentSupply).toFixed(2)
    let xdaiPercent = parseFloat(100 - mainnetPercent - bscPercent).toFixed(2)
    console.log("###########################")
    console.log("###########################")
    console.log("CURRENT CIRCULATING SUPPLY TOTAL")
    console.log(Number(currentSupply).toLocaleString('en-US') + " XGT")
    console.log("CURRENT CIRCULATING SUPPLY ON XDAI")
    console.log(Number(parseFloat(currentSupply - mainnetBalance - bscBalance)).toLocaleString('en-US') + " XGT (" + xdaiPercent + "%)")
    console.log("CURRENT CIRCULATING SUPPLY ON ETH MAINNET")
    console.log(Number(parseFloat(mainnetBalance)).toLocaleString('en-US') + " XGT (" + mainnetPercent + "%)")
    console.log("CURRENT CIRCULATING SUPPLY ON BSC")
    console.log(Number(parseFloat(bscBalance)).toLocaleString('en-US') + " XGT (" + bscPercent + "%)")
    console.log("###########################")
    console.log("MARKET CAP BASED ON THIS SUPPLY")
    console.log("$" + Number(parseFloat(currentSupply * xgtPrice).toFixed(0)).toLocaleString('en-US'))
    console.log("###########################")
    console.log("XGT PRICE ON XDAI")
    console.log("$" + Number(parseFloat(latestInfo.xgt_price_xdai).toFixed(4)).toLocaleString('en-US'))
    console.log("XGT PRICE ON BSC")
    console.log("$" + Number(parseFloat(latestInfo.xgt_price_bsc).toFixed(4)).toLocaleString('en-US'))
    console.log("XGT PRICE WEIGHTED AVERAGE")
    console.log("$" + Number(parseFloat(xgtPrice).toFixed(4)).toLocaleString('en-US'))
    console.log("###########################")
    console.log("###########################")
}

async function communitySupply() {
    let totalSupply = new Big("3000000000")
    let xgtContractXDai = new web3xDai.eth.Contract(abiDAI, addressXGT, null);
    let vestedSupply = new Big("1500000000")
    let lpSupply = new Big("300000000")

    let genSupply = await xgtContractXDai.methods.balanceOf(addressXGTGenerator).call();
    genSupply = new Big(genSupply.toString()).div(new Big(10 ** 18)).toFixed(0)
    let gnosisSupply = await xgtContractXDai.methods.balanceOf("0x7418Eb337cF87AF223d07A857387c1F8E7942Ae6").call();
    gnosisSupply = new Big(gnosisSupply.toString()).div(new Big(10 ** 18)).toFixed(0)
    let gnosisShouldSupply = new Big("350000000")
    let diff = new Big(totalSupply).sub(vestedSupply).sub(genSupply).sub(lpSupply).add(gnosisShouldSupply).sub(gnosisSupply)
    console.log(diff.toString())


}

async function getCurrentRatio() {
    let pairContract = new web3xDai.eth.Contract(abiPair, addressPair, null);
    let res = await pairContract.methods.getReserves().call();
    let reserveXGT, reserveXDAI;
    if (new Big(res["1"]).gt(new Big(res["0"]))) {
        reserveXDAI = res["0"];
        reserveXGT = res["1"];
    } else {
        reserveXDAI = res["1"];
        reserveXGT = res["0"];
    }
    if (new Big(reserveXGT).eq(new Big("0"))) {
        lpRatio = new Big("0.02");
        return
    }
    lpRatio = new Big(reserveXDAI).div(new Big(reserveXGT));
}

async function getStakeValue() {
    let stakeContract = new web3Mainnet.eth.Contract(abiXGTStakeMainnet, addressXGTStakeMainnet, null);
    let rawDAI = await stakeContract.methods.userDepositsDai(selectedAccount).call();
    let balance = new Big("0")
    if (!(new Big(rawDAI).eq(new Big("0")))) {
        let cDaiContract = new web3Mainnet.eth.Contract(abiCDAI, addressCDAI, null);
        let rawCDAI = await stakeContract.methods.userDepositsCDai(selectedAccount).call();
        let totalDAI = await stakeContract.methods.totalDeposits().call();
        tvl = parseFloat(new Big(totalDAI).div(new Big(10 ** decimalsDai)).toString())
        let currentCDAI = web3Mainnet.utils.fromWei((new Big(rawCDAI).mul(new Big(10 ** (18 - decimalsCDai)))).toFixed(0).toString());
        let exchangeRate = await cDaiContract.methods.exchangeRateCurrent().call();
        balance = new Big(currentCDAI).mul(new Big(exchangeRate).div(new Big(1e28)))
    }
    stakeValue = balance;

    if ($("#earnSpan").length) {
        if (!$("#earnSpan").is(":visible")) {
            $("#earnSpan").show();
        }
        let daiValue = (new Big(rawDAI.toString()).div(new Big(10 ** 18)))
        let interest = stakeValue.sub(daiValue).toFixed(2).toString();
        $("#earnValue").html(daiValue.toFixed(2).toString() + " DAI + " + interest + " DAI Interest")
    }
    if (window.location.href.indexOf("earn") > -1) {
        setStakeValue();
    }
}

function setStakeValue() {
    $("#earnings").html(parseFloat(stakeValue).toFixed(2));
}

async function setAllValues() {
    let balance = parseFloat(stakeValue) + parseFloat(lpValue);
    $("#earnings").html(parseFloat(balance).toFixed(2));
}

async function refreshAccountData() {
    document
        .querySelector("#connect-wallet")
        .setAttribute("disabled", "disabled");
    await fetchAccountData(provider);
    document.querySelector("#connect-wallet").removeAttribute("disabled");
}

async function waitForSwitch(id, purpose) {
    if (typeof web3 == "undefined") {
        return false;
    }
    if (web3Modal.providerController.cachedProvider == "torus") {
        if (torusId == parseInt(id, 16)) {
            return true;
        }
        $(".preloader").show();
        await onDisconnect()
        if (id == mainnetId) {
            torusId = parseInt(mainnetId, 16);
            torusHost = mainnetRpc;
        } else {
            torusId = parseInt(xdaiId, 16);
            torusHost = xdaiRpcFallback;
        }
        await init(false);
        $(".preloader").hide();
        return true;
    }
    let currentIDTemp = await web3.eth.getChainId();
    let currentID = currentIDTemp.toString(16);
    if (currentID != id) {
        $("#network-notification").addClass("active");
        $("#network-switch-purpose").html(purpose);
        if (id == xdaiId) {
            $("#network-switch-to").html(xdai)
        } else {
            $("#network-switch-to").html(mainnet)
        }
        while (currentID != id) {
            let currentIDTemp = await web3.eth.getChainId();
            currentID = currentIDTemp.toString(16);
            await sleep(500)
        }
        $("#network-notification").removeClass("active");
    }
    return true
}

async function startEarning() {
    if ($("#earn-input").val() == "" || parseFloat($("#earn-input").val()) == 0) {
        return
    }
    if ($("#earn-input").hasClass("redInput")) {
        $("#error-popup-money-earn").addClass("popup_open")
        return
    }
    await checkConnected();
    let networkOk = await waitForSwitch(mainnetId, "earn");
    if (!networkOk) {
        return
    }
    let amount = web3Mainnet.utils.toWei(new Big($("#earn-input").val()).toFixed(10).toString(), "ether");
    let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
    let fee1 = 66069;
    let fee2 = 500000;
    let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
    let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
    let latestGas = await gasOracle.methods.latestAnswer().call();
    let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
    let cost = ((new Big(latestGas.toString()).mul(new Big(fee1 + fee2))).div(new Big(latestEthDai.toString()))).toFixed(2).toString();
    $('strong[id^="earn-dai-amount"]').html($("#earn-input").val());
    let total = parseFloat(parseFloat($("#earn-input").val()) + parseFloat(cost)).toFixed(2);
    $('strong[id^="earn-total"]').html(total);
    $('strong[id^="earn-fee"]').html(cost);

    let allowance = await daiContract.methods
        .allowance(selectedAccount, addressXGTStakeMainnet)
        .call();
    if ((new Big(allowance).mul(new Big(10 ** (18 - decimalsDai)))).lt(new Big(amount))) {
        $("#confirm_approval").addClass("popup_open");
    } else {
        $("#confirm_earn_1").addClass("popup_open");
    }
}

async function earn_Approve() {
    let amount = new Big(web3.utils.toWei($("#earn-input").val(), "ether").toString()).div(new Big(10 ** (18 - decimalsDai)));
    let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
    $("#confirm_approval").removeClass("popup_open");
    if (!paySelf) {
        let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
        let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);

        let latestGas = await gasOracle.methods.latestAnswer().call();
        let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
        let minCost = (new Big(latestGas.toString()).mul(new Big(new Big("500000").mul(new Big("1000000000000")))).mul(new Big("1000000"))).div(new Big(latestEthDai));
        minCost = (new Big(minCost.toString()).div(new Big(10 ** decimalsDai))).toFixed(2);
        if (parseFloat($("#earn-input").val()) < parseFloat(minCost.toString())) {
            $("#errormsg").html("You need stake at least " + parseFloat(parseFloat(minCost.toString()) + 0.05).toFixed(2) + " DAI to cover the fees.")
            $("#error-detail-target").html("EARNING");
            $("#error-popup-detail").addClass("popup_open");
            return;
        }
    }
    $("#wait_purpose").html("Waiting for the approval transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("EARNING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        earn_Approve();
    })
    refreshBalance();

    try {
        let txReturn;
        if (!paySelf) {
            await daiPermit(addressXGTStakeMainnet);
            return
        } else {
            if (parseFloat(gBalanceDAI - parseFloat($("#earn-input").val())) <= 0.1) {
                amount = await daiContract.methods.balanceOf(selectedAccount).call();
            }
            txReturn = await daiContract.methods
                .approve(addressXGTStakeMainnet, amount.toString())
                .send({
                    from: selectedAccount
                });
        }
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('strong[id^="earn-total"]').html("0.00");
            $('strong[id^="earn-fee"]').html("0.00");
            $("#confirm_earn_2").addClass("popup_open");
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function daiPermitEarn(spenderAddress) {
    let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
    const message = {
        holder: selectedAccount,
        spender: spenderAddress,
        nonce: parseInt((await daiContract.methods.nonces(selectedAccount).call()).toString()),
        expiry: Math.round(new Date().getTime() / 1000) + 60 * 60,
        allowed: true,
    };
    const typedData = JSON.stringify({
        types: {
            EIP712Domain: [{
                    name: "name",
                    type: "string",
                },
                {
                    name: "version",
                    type: "string",
                },
                {
                    name: "chainId",
                    type: "uint256",
                },
                {
                    name: "verifyingContract",
                    type: "address",
                },
            ],
            Permit: [{
                    name: "holder",
                    type: "address",
                },
                {
                    name: "spender",
                    type: "address",
                },
                {
                    name: "nonce",
                    type: "uint256",
                },
                {
                    name: "expiry",
                    type: "uint256",
                },
                {
                    name: "allowed",
                    type: "bool",
                },
            ],
        },
        primaryType: "Permit",
        domain: {
            name: "Dai Stablecoin",
            version: "1",
            chainId: 1,
            verifyingContract: addressDAI,
        },
        message: message,
    });

    await web3.currentProvider.send({
            jsonrpc: "2.0",
            id: 999999999999,
            method: "eth_signTypedData_v4",
            params: [selectedAccount, typedData]
        },
        function (error, response) {
            if (error || (response && response.error)) {
                console.log(error)
                $("#wait-popup").removeClass("popup_open");
                $("#error-popup").addClass("popup_open");
            } else if (response && response.result) {
                const r = response.result.slice(0, 66);
                const s = "0x" + response.result.slice(66, 130);
                const v = "0x" + response.result.slice(130, 132);
                const url = permitTxAPI;
                const data = {
                    "Holder": message.holder,
                    "Spender": message.spender,
                    "Nonce": message.nonce,
                    "Expiry": message.expiry,
                    "Allowed": message.allowed,
                    "SigR": r,
                    "SigS": s,
                    "SigV": v
                };
                const other_params = {
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data),
                    method: "POST",
                };
                fetch(url, other_params)
                    .catch(function () {
                        $("#wait-popup").removeClass("popup_open");
                        $("#error-popup").addClass("popup_open");
                        return Promise.reject()
                    })
                    .then(response => response.json())
                    .catch(function () {
                        $("#wait-popup").removeClass("popup_open");
                        $("#error-popup").addClass("popup_open");
                        return Promise.reject()
                    })
                    .then(json => {
                        if (json.Status == "ok") {
                            $("#wait-popup").removeClass("popup_open");
                            $('strong[id^="earn-total"]').html("0.00");
                            $('strong[id^="earn-fee"]').html("0.00");
                            $("#confirm_earn_2").addClass("popup_open");
                            return
                        } else {
                            $("#wait-popup").removeClass("popup_open");
                            $("#error-popup").addClass("popup_open");
                            return
                        }
                    })
            }
        }
    );
}

async function earn_Final(estimate) {
    refreshBalance();
    let amount = new Big(web3.utils.toWei($("#earn-input").val(), "ether").toString()).div(new Big(10 ** (18 - decimalsDai)));
    amount = amount.toFixed(0);

    let XGTStakeMainnetContract = new web3.eth.Contract(
        abiXGTStakeMainnet,
        addressXGTStakeMainnet,
        null
    );

    if (estimate) {
        let txReturn = await XGTStakeMainnetContract.methods
            .depositTokens((0).toString())
            .estimateGas({
                from: selectedAccount
            });
        return txReturn;
    }
    $("#confirm_earn_1").removeClass("popup_open");
    $("#confirm_earn_2").removeClass("popup_open");
    if (!paySelf) {
        let minCost = await XGTStakeMainnetContract.methods.currentRefundCostDeposit().call();
        minCost = (new Big(minCost.toString()).div(new Big(10 ** decimalsDai))).toFixed(2);
        if (parseFloat($("#earn-input").val()) < parseFloat(minCost.toString())) {
            $("#errormsg").html("You need stake at least " + parseFloat(parseFloat(minCost.toString()) + 0.05).toFixed(2) + " DAI to cover the fees.")
            $("#error-detail-target").html("EARNING");
            $("#error-popup-detail").addClass("popup_open");
            return;
        }
        earnMeta()
        return
    }
    $("#wait_purpose").html("Waiting for the earn transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("EARNING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        earn_Final();
    })

    try {
        if (parseFloat(gBalanceDAI - parseFloat($("#earn-input").val())) <= 0.1) {
            let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
            amount = await daiContract.methods.balanceOf(selectedAccount).call();
        }
        let txReturn = await XGTStakeMainnetContract.methods
            .depositTokens(amount.toString())
            .send({
                from: selectedAccount
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlMainnet + txReturn.transactionHash, "_blank");
            })
            $("#earn-success").addClass("popup_open");
            refreshBalance();
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }

    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function migrateLP(step) {
    await checkConnected();
    let networkOk = await waitForSwitch(xdaiId, "withdraw");
    if (!networkOk) {
        return
    }
    $("#confirm_farm_migrate_1_4").removeClass("popup_open");
    $("#confirm_farm_migrate_2_4").removeClass("popup_open");
    $("#confirm_farm_migrate_3_4").removeClass("popup_open");
    $("#confirm_farm_migrate_4_4").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the migration transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("MIGRATION");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        migrateLP(step);
    })

    if (step == 1) {
        let pairContract = new web3.eth.Contract(abiPair, addressPairOLD, null);
        let lpBalance = await pairContract.methods.balanceOf(selectedAccount).call();

        try {
            let txReturn = await pairContract.methods.approve(addressRouterOLD, lpBalance).send({
                from: selectedAccount,
                gasPrice: "1000000000",
            });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $("#confirm_farm_migrate_2_4").addClass("popup_open");
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
        $("#wait-popup").removeClass("popup_open");
    } else if (step == 2) {
        let xgtContract = new web3.eth.Contract(abiDAI, addressXGT, null);
        let pairContract = new web3.eth.Contract(abiPair, addressPairOLD, null);
        let lpBalance = await pairContract.methods.balanceOf(selectedAccount).call();
        let routerContract = new web3.eth.Contract(abiRouter, addressRouterOLD, null);
        migrationXGTbalance = await xgtContract.methods.balanceOf(selectedAccount).call();
        try {
            await getLPValue(true);
            let txReturn = await routerContract.methods.removeLiquidityETH(addressXGT, lpBalance, 0, 0, selectedAccount, Math.round(new Date().getTime() / 1000) + 60 * 60).send({
                from: selectedAccount,
                gasPrice: "1000000000"
            });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                let newBalance = await xgtContract.methods.balanceOf(selectedAccount).call();
                while (new Big(newBalance.toString()).eq(new Big(migrationXGTbalance.toString()))) {
                    newBalance = await xgtContract.methods.balanceOf(selectedAccount).call();
                    await sleep(500)
                }
                migrationXGTbalance = new Big(newBalance.toString()).sub(new Big(migrationXGTbalance)).toString();
                $("#confirm_farm_migrate_3_4").addClass("popup_open");
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
        $("#wait-popup").removeClass("popup_open");
    } else if (step == 3) {
        let xgtContract = new web3.eth.Contract(abiDAI, addressXGT, null);
        try {
            let txReturn = await xgtContract.methods
                .approve(addressRouter, migrationXGTbalance)
                .send({
                    from: selectedAccount,
                    gasPrice: "1000000000"
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $("#confirm_farm_migrate_4_4").addClass("popup_open");
                return
            } else {
                $("#error-popup").addClass("popup_open");
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
        $("#wait-popup").removeClass("popup_open");
    } else if (step == 4) {
        let xdaiValue = new Big(migrationXGTbalance).mul(lpRatio).toFixed(0).toString()
        let balanceXDai = await web3.eth.getBalance(selectedAccount);
        if (new Big(balanceXDai.toString()).lte(new Big(xdaiValue.toString()))) {
            xdaiValue = new Big(balanceXDai.toString()).sub(0.015 * 10 ** 18).toFixed(0).toString();
        }

        let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);
        try {
            let txReturn = await routerContract.methods
                .addLiquidityETH(
                    addressXGT,
                    migrationXGTbalance,
                    0,
                    0,
                    selectedAccount,
                    Math.round(new Date().getTime() / 1000) + 60 * 60
                )
                .send({
                    from: selectedAccount,
                    value: xdaiValue,
                    gasPrice: "1000000000"
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $("#migration-success").addClass("popup_open");
                refreshBalance();
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
        $("#wait-popup").removeClass("popup_open");
    }
}

async function provideLiquidity() {
    if ($("#provideLiquidityXDai").hasClass("redInput") || $("#provideLiquidityXGT").hasClass("redInput")) {
        $("#error-popup-money-farm").addClass("popup_open")
        return
    }
    await checkConnected();
    let networkOk = await waitForSwitch(xdaiId, "farm");
    if (!networkOk) {
        return
    }
    let xgtAmount, xdaiAmount;
    let xgtContract = new web3.eth.Contract(abiDAI, addressXGT, null);
    if (($("#xgt").is(':checked'))) {
        if ($("#provideLiquidityXDai").val() == "") {
            return
        }
        if ($("#provideLiquidityXGT").val() == "" || $("#provideLiquidityXGT").val() == 0) {
            xgtAmount = web3.utils.toWei(new Big($("#provideLiquidityXDai").val()).div(new Big(lpRatio)).toFixed(10).toString(), "ether");
        } else {
            xgtAmount = web3.utils.toWei(new Big($("#provideLiquidityXGT").val()).toFixed(10).toString(), "ether");
        }
        halfXGTAmount = xgtAmount
        if (gBalanceXDai <= $("#swapLeft").val()) {
            $("#swapLeft").val(parseFloat(parseFloat($("#swapLeft").val()) - 0.01).toFixed(2))
        }

        xdaiAmount = web3.utils.toWei(new Big($("#provideLiquidityXDai").val()).toFixed(10).toString(), "ether");
        if (new Big(xgtAmount).eq(new Big(0)) || new Big(xdaiAmount).eq(new Big(0))) {
            return
        }
        $('strong[id^="farm-xdai-amount"]').html($("#provideLiquidityXDai").val());
        $('strong[id^="farm-xgt-amount"]').html($("#provideLiquidityXGT").val());
        let total = parseFloat(parseFloat($("#provideLiquidityXGT").val()) * xgtPrice + parseFloat($("#provideLiquidityXDai").val())).toFixed(2);
        $('strong[id^="farm-total"]').html(total);
    } else {
        if ($("#provideLiquidityXDai").val() == "") {
            return
        }
        xdaiAmount = web3.utils.toWei(new Big($("#provideLiquidityXDai").val()).toFixed(10).toString(), "ether");
        if (new Big(xdaiAmount).eq(new Big(0))) {
            return
        }
        $('strong[id^="farm-xdai-amount"]').html(parseFloat(parseFloat($("#provideLiquidityXDai").val()) / 2).toFixed(2));
        $('strong[id^="farm-xgt-amount"]').html(parseFloat(parseFloat(parseFloat($("#provideLiquidityXDai").val()) / 2) / xgtPrice).toFixed(0));
        $('strong[id^="farm-total"]').html($("#provideLiquidityXDai").val());
    }
    $('strong[id^="farm-fee"]').html("<0.01");
    if (($("#xgt").is(':checked'))) {
        let allowance = await xgtContract.methods
            .allowance(selectedAccount, addressRouter)
            .call();

        if (
            new Big(allowance).lt(new Big(xgtAmount))
        ) {
            $("#confirm_approval").addClass("popup_open");
        } else {
            $("#confirm_farm_1").addClass("popup_open");
        }
    } else {
        $("#confirm_farm_1_3").addClass("popup_open");
    }

}

async function provideLiquidity_Approve(overriding) {
    $("#confirm_approval").removeClass("popup_open");
    $("#confirm_farm_1_3").removeClass("popup_open");
    $("#confirm_farm_2_3").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the approval transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("FARMING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        provideLiquidity_Approve();
    })
    refreshBalance();
    if (($("#xgt").is(':checked')) || overriding) {
        let xgtAmount = halfXGTAmount.toString()
        let xgtContract = new web3.eth.Contract(abiDAI, addressXGT, null);
        let currentAllowance = await xgtContract.methods.allowance(selectedAccount, addressRouter).call();
        if (new Big(currentAllowance.toString()).gte(new Big(xgtAmount.toString()))) {
            $("#wait-popup").removeClass("popup_open");
            $('strong[id^="farm-total"]').html("0.00");
            $('strong[id^="farm-fee"]').html("0.00");
            if ($("#xgt").is(':checked')) {
                $("#confirm_farm_2").addClass("popup_open");
            } else {
                $("#confirm_farm_3_3").addClass("popup_open");
            }
            return
        }
        try {
            let txReturn = await xgtContract.methods
                .approve(addressRouter, xgtAmount)
                .send({
                    from: selectedAccount,
                    gasPrice: "1000000000"
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('strong[id^="farm-total"]').html("0.00");
                $('strong[id^="farm-fee"]').html("0.00");
                if ($("#xgt").is(':checked')) {
                    $("#confirm_farm_2").addClass("popup_open");
                } else {
                    $("#confirm_farm_3_3").addClass("popup_open");
                }
                return
            } else {
                $("#error-popup").addClass("popup_open");
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
    } else {
        let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);
        let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
        let xdaiAmount = (new Big($("#provideLiquidityXDai").val()).mul(new Big(0.995 / 2)).mul(new Big(10 ** 18))).toFixed(0).toString();

        let rate = await routerContract.methods
            .getAmountsOut(xdaiAmount, [addressWETH, addressXGT])
            .call();
        let xgtRate = (new Big(rate[1].toString()).mul(new Big("0.98"))).toFixed(0).toString();
        let balanceBefore = await xgtContract.methods.balanceOf(selectedAccount).call();
        try {
            let txReturn = await routerContract.methods.swapExactETHForTokens(
                xgtRate,
                [addressWETH, addressXGT],
                selectedAccount,
                Math.round(new Date().getTime() / 1000) + 60 * 60).send({
                from: selectedAccount,
                value: xdaiAmount,
                gasPrice: "1000000000"
            });
            let balanceAfter = balanceBefore
            while (((new Big(balanceAfter.toString())).sub(new Big(balanceBefore.toString()))).lte(new Big(0))) {
                balanceAfter = await xgtContract.methods.balanceOf(selectedAccount).call();
                await sleep(500)
            }
            halfXGTAmount = (new Big(balanceAfter.toString()).sub(new Big(balanceBefore.toString()))).toFixed(0);
            let currentAllowance = await xgtContract.methods.allowance(selectedAccount, addressRouter).call();
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('strong[id^="farm-total"]').html("0.00");
                $('strong[id^="farm-fee"]').html("0.00");
                if (new Big(currentAllowance.toString()).gte(new Big(halfXGTAmount.toString()))) {
                    $("#confirm_farm_3_3").addClass("popup_open");
                } else {
                    $("#confirm_farm_2_3").addClass("popup_open");
                }
                return
            } else {
                $("#error-popup").addClass("popup_open");
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
    }
    $("#wait-popup").removeClass("popup_open");
}

async function provideLiquidity_Final() {
    $("#confirm_farm_1").removeClass("popup_open");
    $("#confirm_farm_2").removeClass("popup_open");
    $("#confirm_farm_3_3").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the farm transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("FARMING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        provideLiquidity_Final();
    })
    refreshBalance();
    let xdaiAmount;
    let xgtAmount = halfXGTAmount.toString();
    if (($("#xgt").is(':checked'))) {
        xdaiAmount = web3.utils.toWei(parseFloat(parseFloat($("#provideLiquidityXDai").val())).toFixed(10).toString(), "ether");
        // xgtAmount = web3.utils.toWei(new Big($("#provideLiquidityXDai").val()).div(new Big(lpRatio)).toFixed(10).toString(), "ether");
        // xgtMin = new Big(xgtAmount.toString()).mul(new Big(1 - parseFloat($("#slippage").val()) / 100)).toFixed(0).toString()
        // xdaiMin = new Big(xdaiAmount.toString()).mul(new Big(1 - parseFloat($("#slippage").val()) / 100)).toFixed(0).toString()
    } else {
        xdaiAmount = (new Big($("#provideLiquidityXDai").val()).mul(new Big(0.495)).mul(new Big(10 ** 18))).toFixed(0).toString();
    }

    let xgtMin = (new Big(xgtAmount.toString()).mul(0.8)).toFixed(0).toString();
    let xdaiMin = (new Big(xdaiAmount.toString()).mul(0.8)).toFixed(0).toString();

    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let balance = await xgtContract.methods.balanceOf(selectedAccount).call();
    if (new Big(balance.toString()).lt(new Big(xgtAmount.toString()))) {
        xgtAmount = balance;
        xgtMin = (new Big(xgtAmount.toString()).mul(0.25)).toFixed(0).toString();
        xdaiMin = (new Big(xdaiAmount.toString()).mul(0.25)).toFixed(0).toString();
    }

    let balanceXDai = await web3.eth.getBalance(selectedAccount);
    if (new Big(balanceXDai.toString()).lte(new Big(xdaiAmount.toString()))) {
        if (new Big(balanceXDai.toString()).lte(new Big(1.5 * 10 ** 16))) {
            $("#error-popup").addClass("popup_open");
            return
        }
        xdaiAmount = new Big(balanceXDai.toString()).sub(1.5 * 10 ** 16).toFixed(0).toString();
        xgtMin = (new Big(xgtAmount.toString()).mul(0.25)).toFixed(0).toString();
        xdaiMin = (new Big(xdaiAmount.toString()).mul(0.25)).toFixed(0).toString();
    }


    let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);
    try {
        let txReturn = await routerContract.methods
            .addLiquidityETH(
                addressXGT,
                xgtAmount,
                xgtMin,
                xdaiMin,
                selectedAccount,
                Math.round(new Date().getTime() / 1000) + 60 * 60
            )
            .send({
                from: selectedAccount,
                value: xdaiAmount,
                gasPrice: "1000000000"
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlXDai + txReturn.transactionHash, "_blank");
            })
            $("#farm-success").addClass("popup_open");
            refreshBalance();
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}
async function withdraw() {
    await checkConnected();
    let amount = parseFloat($("#withdraw-input").val()).toFixed(2);
    if (amount == 0 || isNaN(amount)) {
        return
    }
    $("#advanced1").hide();
    $("#advanced2").hide();
    if (withdrawId == 1) {
        $("#advanced1").show();
        $("#advanced2").show();
        let networkOk = await waitForSwitch(mainnetId, "withdraw");
        if (!networkOk) {
            return
        }
        $('strong[id^="withdraw-total"]').html(amount);
        let fee = 470000;
        let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
        let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
        let latestGas = await gasOracle.methods.latestAnswer().call();
        let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
        let cost = ((new Big(latestGas.toString()).mul(new Big(fee))).div(new Big(latestEthDai.toString()))).toFixed(2).toString();
        $('strong[id^="withdraw-fee"]').html(cost);
        $('strong[id^="withdraw_amount"]').html(amount);
        $('strong[id^="withdraw_goal"]').html("INTEREST SHARES");
        $("#confirm_withdraw_1").addClass("popup_open");
    } else if (withdrawId == 2) {
        let networkOk = await waitForSwitch(xdaiId, "withdraw");
        if (!networkOk) {
            return
        }
        $('strong[id^="withdraw-total"]').html(amount);
        $('strong[id^="withdraw-fee"]').html("<0.01");
        $('strong[id^="withdraw_amount"]').html(amount);
        $('strong[id^="withdraw_goal"]').html("FARMING SHARES");

        let fraction = new Big(amount / parseFloat(lpValue).toFixed(2)).mul(new Big(lpShares.toString())).toFixed(0);
        let pairContract = new web3.eth.Contract(abiPair, addressPair, null);
        let allowance = await pairContract.methods.allowance(selectedAccount, addressRouter).call();
        if (new Big(allowance.toString()).lt(fraction)) {
            $("#confirm_approval_withdraw").addClass("popup_open");
        } else {
            $("#confirm_withdraw_1").addClass("popup_open");
        }
    } else if (withdrawId == 3) {
        let networkOk = await waitForSwitch(xdaiId, "withdraw");
        if (!networkOk) {
            return
        }
        $('strong[id^="withdraw-total"]').html(amount);
        $('strong[id^="withdraw-fee"]').html("<0.01");
        $('strong[id^="withdraw_amount"]').html(amount);
        $('strong[id^="withdraw_goal"]').html("XGT REWARDS");
        $("#confirm_withdraw_1").addClass("popup_open");
    } else if (withdrawId == 4) {
        let networkOk = await waitForSwitch(xdaiId, "withdraw");
        if (!networkOk) {
            return
        }
        $('strong[id^="withdraw-total"]').html(amount);
        $('strong[id^="withdraw-fee"]').html("18.12");
        $('strong[id^="withdraw_amount"]').html(amount);
        $('strong[id^="withdraw_goal"]').html("COMBINED SHARES");

        let pairContract = new web3.eth.Contract(abiPair, addressPair, null);
        let allowance = await pairContract.methods.allowance(selectedAccount, addressRouter).call();
        if (new Big(allowance.toString()).lt(new Big(lpShares.toString()))) {
            $("#confirm_approval_withdraw_all").addClass("popup_open");
        } else {
            $("#confirm_withdraw_2_1_all").addClass("popup_open");
        }
    }
}

async function withdraw_Approve() {
    let amount = parseFloat($("#withdraw-input").val()).toFixed(2);
    $("#confirm_approval_withdraw").removeClass("popup_open");
    $("#confirm_approval_withdraw_all").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the approval transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("WITHDRAW");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        withdraw_Approve();
    })
    let lpValueTemp = parseFloat((latestInfo.total_pool_value[0] / latestInfo.total_pool_tokens[0]) * latestInfo.pool_tokens[0])
    let fraction = new Big(amount / parseFloat(lpValueTemp)).mul(new Big(parseFloat(latestInfo.pool_tokens[0])))

    if (withdrawId == 4) {
        fraction = lpShares;
    }
    if (new Big(fraction).gt(new Big(lpShares))) {
        fraction = lpShares
    }
    fraction = new Big(fraction).mul(new Big(10 ** 18)).toFixed(0)
    let pairContract = new web3.eth.Contract(abiPair, addressPair, null);
    let currentBalance = await pairContract.methods.balanceOf(selectedAccount).call();
    if ((new Big(currentBalance).sub(fraction)).lt(new Big(10 ** 17))) {
        fraction = currentBalance
    }
    try {
        let txReturn = await pairContract.methods.approve(addressRouter, fraction.toString()).send({
            from: selectedAccount,
            gasPrice: "1000000000",
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('strong[id^="withdraw-total"]').html("0.00");
            $('strong[id^="withdraw-fee"]').html("0.00");
            if (withdrawId == 4) {
                $("#confirm_withdraw_3_2_all").addClass("popup_open");
            } else {
                $("#confirm_withdraw_2").addClass("popup_open");
            }
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function withdraw_Final(step, stepLen, estimate) {
    let amount = parseFloat($("#withdraw-input").val()).toFixed(2);
    if (estimate) {
        let networkOk = await waitForSwitch(mainnetId, "withdraw");
        if (!networkOk) {
            return
        }
        let XGTStakeMainnetContract = new web3.eth.Contract(
            abiXGTStakeMainnet,
            addressXGTStakeMainnet,
            null
        );
        amount = (new Big(amount.toString()).mul(new Big(10 ** decimalsDai))).toFixed(0).toString();
        let txReturn = await XGTStakeMainnetContract.methods
            .withdrawTokens(amount).estimateGas({
                from: selectedAccount
            });
        return txReturn;
    }
    $("#confirm_withdraw_1").removeClass("popup_open");
    $("#confirm_withdraw_2").removeClass("popup_open");
    $("#confirm_withdraw_2_1_all").removeClass("popup_open");
    $("#confirm_withdraw_2_2_all").removeClass("popup_open");
    $("#confirm_withdraw_3_2_all").removeClass("popup_open");
    $("#confirm_withdraw_3_3_all").removeClass("popup_open");

    if (withdrawId == 1 || (withdrawId == 4 && step == 1)) {
        let networkOk = await waitForSwitch(mainnetId, "withdraw");
        if (!networkOk) {
            return
        }
        if (!paySelf) {
            let stakeContract = new web3.eth.Contract(abiXGTStakeMainnet, addressXGTStakeMainnet, null);
            let minCost = await stakeContract.methods.currentRefundCostWithdraw().call();
            minCost = (new Big(minCost.toString()).div(new Big(10 ** decimalsDai))).toFixed(2);
            if (amount < parseFloat(minCost.toString())) {
                $("#errormsg").html("You need stake at least " + parseFloat(parseFloat(minCost.toString()) + 0.05).toFixed(2) + " DAI to cover the fees.")
                $("#error-detail-target").html("EARNING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            withdrawMeta()
            return
        }
    } else {
        let networkOk = await waitForSwitch(xdaiId, "withdraw");
        if (!networkOk) {
            return
        }
    }

    $("#wait_purpose").html("Waiting for the withdraw transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("WITHDRAW");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        withdraw_Final();
    })


    if (withdrawId == 1 || (withdrawId == 4 && step == 1)) {
        if (parseFloat(stakeValue.toString()) - amount <= 0.15 || step == 1) {
            amount = web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1));
        } else {
            amount = (new Big(amount.toString()).mul(new Big(10 ** decimalsDai))).toFixed(0).toString();
        }
        let XGTStakeMainnetContract = new web3.eth.Contract(
            abiXGTStakeMainnet,
            addressXGTStakeMainnet,
            null
        );
        let staked = await XGTStakeMainnetContract.methods.userDepositsDai(selectedAccount).call();
        if (new Big(staked.toString()).eq(new Big("0"))) {
            if (step == 1) {
                if (stepLen == 2) {
                    $("#confirm_withdraw_2_2_all").addClass("popup_open");
                } else {
                    $("#confirm_withdraw_3_3_all").addClass("popup_open");
                }
            }
            return
        }
        try {
            let txReturn = await XGTStakeMainnetContract.methods
                .withdrawTokens(amount)
                .send({
                    from: selectedAccount
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('[id^="txlink"]').prop("onclick", null).off("click");
                $('[id^="txlink"]').on("click", function () {
                    window.open(txUrlMainnet + txReturn.transactionHash, "_blank");
                })
                if (step == 1) {
                    if (stepLen == 2) {
                        $("#confirm_withdraw_2_2_all").addClass("popup_open");
                    } else {
                        $("#confirm_withdraw_3_3_all").addClass("popup_open");
                    }
                } else {
                    $("#withdraw-success").addClass("popup_open");
                }
                refreshBalance();
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }

        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
        $("#wait-popup").removeClass("popup_open");
    } else if (withdrawId == 2 || (withdrawId == 4 && step == 2)) {
        let lpValueTemp = parseFloat((latestInfo.total_pool_value[0] / latestInfo.total_pool_tokens[0]) * latestInfo.pool_tokens[0])
        let fraction = new Big(amount / parseFloat(lpValueTemp)).mul(new Big(parseFloat(latestInfo.pool_tokens[0])))

        if (withdrawId == 4) {
            fraction = lpShares;
        }
        if (new Big(fraction).gt(new Big(lpShares))) {
            fraction = lpShares
        }

        // check for diff
        let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);
        let pairContract = new web3.eth.Contract(abiPair, addressPair, null);
        try {
            await getLPValue();
            let minXGT = new Big(lpXGT).mul(fraction).div(new Big(web3.utils.toWei(lpShares.toString()))).mul(new Big("0.80")).mul(new Big("1000000000000000000")).toFixed(0);
            let minXDAI = new Big(lpXDai).mul(fraction).div(new Big(web3.utils.toWei(lpShares.toString()))).mul(new Big("0.80")).mul(new Big("1000000000000000000")).toFixed(0);
            fraction = new Big(fraction).mul(new Big(10 ** 18)).toFixed(0)
            let currentBalance = await pairContract.methods.balanceOf(selectedAccount).call();
            if ((new Big(currentBalance).sub(fraction)).lt(new Big(10 ** 17))) {
                fraction = currentBalance
            }
            let txReturn = await routerContract.methods.removeLiquidityETH(addressXGT, fraction.toString(), minXGT.toString(), minXDAI.toString(), selectedAccount, Math.round(new Date().getTime() / 1000) + 60 * 60).send({
                from: selectedAccount,
                gasPrice: "1000000000"
            });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('[id^="txlink"]').prop("onclick", null).off("click");
                $('[id^="txlink"]').on("click", function () {
                    window.open(txUrlXDai + txReturn.transactionHash, "_blank");
                })
                $("#withdraw-success").addClass("popup_open");
                if (withdrawId == 4) {
                    $("#withdraw-input").val("0.00");
                }
                refreshBalance();
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
        $("#wait-popup").removeClass("popup_open");
    } else if (withdrawId == 3) {
        let XGTGeneratorContract = new web3.eth.Contract(
            abiXGTGenerator,
            addressXGTGenerator,
            null
        );
        try {
            let txReturn = await XGTGeneratorContract.methods
                .claimXGT(selectedAccount)
                .send({
                    from: selectedAccount,
                    gasPrice: "1000000000"
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('[id^="txlink"]').prop("onclick", null).off("click");
                $('[id^="txlink"]').on("click", function () {
                    window.open(txUrlXDai + txReturn.transactionHash, "_blank");
                })
                $("#withdraw-input").val("0.00");
                $("#withdraw-success").addClass("popup_open");
                refreshBalance();
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }

        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e)
        }
        $("#wait-popup").removeClass("popup_open");
    }
    $("#withdraw-input").val("");
}

async function swap() {
    await checkConnected();
    if (typeof web3 == "undefined") {
        return
    }
    if ($("#swapLeft").val() == "" || $("#swapRight").val() == "") {
        return
    }

    if ($("#swapLeft").hasClass("redInput")) {
        $("#error-popup-money-swap").addClass("popup_open")
        return
    }

    $("#treebox").hide();
    $("#planttree").prop("checked", false);
    $("#singleswap_first").html("1/<strong>1</strong>")

    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let xgtAmount, xDaiAmount;
    if ($("#swap-select-left").val() == "usd") {
        let output = $("#swap-select-right").val();
        let screen = "auto";
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            screen = 'mobile';
        }
        let widget = new rampInstantSdk.RampInstantSDK({
            hostAppName: 'Xion Finance',
            hostLogoUrl: 'https://xion.finance/images/logo.svg',
            swapAmount: web3.utils.toWei($("#swapLeft").val(), "ether").toString(),
            userAddress: selectedAccount,
            hostApiKey: "wuzhxcpush76oxtbwrsx78fxfuv4czocy27ovkfh",
            swapAsset: output,
            variant: screen
        })
        widget.show();
        widget.domNodes.overlay.style.zIndex = 9999999999;
        console.log(widget.domNodes)
        return
    }

    if ($("#swap-select-left").val() == "xgt-to-mainnet") {
        let networkOk = await waitForSwitch(xdaiId, "swap");
        if (!networkOk) {
            return
        }
        let xgtTransferAmount = $("#swapLeft").val();
        let fee = 180000;
        let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
        let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
        let latestGas = await gasOracle.methods.latestAnswer().call();
        let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
        let ethCost = (new Big(latestGas.toString()).mul(new Big(fee)));
        let cost = ((new Big(latestGas.toString()).mul(new Big(fee))).div(new Big(latestEthDai.toString()))).toFixed(2).toString();
        let mainnetBalance = await web3Mainnet.eth.getBalance(selectedAccount);
        if (new Big(mainnetBalance.toString()).lt(ethCost)) {
            $("#wait-popup").removeClass("popup_open");
            $("#errormsg").html("You don't have enough ETH in your account for this transaction.")
            $("#error-detail-target").html("SWAPPING");
            $("#error-popup-detail").addClass("popup_open");
            return;
        }
        $('strong[id^="swap-total"]').html(parseFloat(xgtTransferAmount).toFixed(2) + " XGT");
        $('strong[id^="swap-fee"]').html(cost);
        $('strong[id^="left-amount"]').html("FROM XDAI");
        $('strong[id^="right-amount"]').html("MAINNET");
        $("#confirm_approval_swap").addClass("popup_open");
        return
    } else if ($("#swap-select-left").val() == "xgt-to-xdai") {
        let networkOk = await waitForSwitch(mainnetId, "swap");
        if (!networkOk) {
            return
        }
        let xgtTransferAmount = $("#swapLeft").val();
        let fee = 98000;
        let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
        let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
        let latestGas = await gasOracle.methods.latestAnswer().call();
        let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
        let ethCost = (new Big(latestGas.toString()).mul(new Big(fee)));
        let cost = ((new Big(latestGas.toString()).mul(new Big(fee))).div(new Big(latestEthDai.toString()))).toFixed(2).toString();
        let mainnetBalance = await web3Mainnet.eth.getBalance(selectedAccount);
        if (new Big(mainnetBalance.toString()).lt(ethCost)) {
            $("#wait-popup").removeClass("popup_open");
            $("#errormsg").html("You don't have enough ETH in your account for this transaction.")
            $("#error-detail-target").html("SWAPPING");
            $("#error-popup-detail").addClass("popup_open");
            return;
        }
        $('strong[id^="swap-total"]').html(parseFloat(xgtTransferAmount).toFixed(2) + " XGT");
        $('strong[id^="swap-fee"]').html(cost);
        $('strong[id^="left-amount"]').html("FROM MAINNET");
        $('strong[id^="right-amount"]').html("XDAI");
        $("#confirm_swap_1").addClass("popup_open");
        return
    }

    if (fixedLeft) {
        if ($("#swap-select-left").val() == "dai" && $("#swap-select-right").val() == "xdai") {
            if (parseFloat($("#swapLeft").val()) < 0.005) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html("You need swap at least 0.005 DAI to xDAI.")
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            let networkOk = await waitForSwitch(mainnetId, "swap");
            if (!networkOk) {
                return
            }
            let daiAmount = $("#swapLeft").val();
            let fee = 55509;
            let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
            let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
            let latestGas = await gasOracle.methods.latestAnswer().call();
            let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            let cost = ((new Big(latestGas.toString()).mul(new Big(fee))).div(new Big(latestEthDai.toString()))).toFixed(2).toString();
            $('strong[id^="swap-total"]').html(parseFloat(parseFloat(daiAmount)).toFixed(2) + " DAI");
            $('strong[id^="swap-fee"]').html(cost);
            $('strong[id^="left-amount"]').html(parseFloat(daiAmount).toFixed(2) + " DAI");
            $('strong[id^="right-amount"]').html(parseFloat(daiAmount).toFixed(2) + " xDAI");
            $("#confirm_swap_1").addClass("popup_open");
            swapId = 5;
        } else if ($("#swap-select-left").val() == "xdai" && $("#swap-select-right").val() == "dai") {
            if (parseFloat($("#swapLeft").val()) < 10) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html("You need swap at least 10 xDAI to DAI.")
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            let networkOk = await waitForSwitch(xdaiId, "swap");
            if (!networkOk) {
                return
            }
            let xDaiAmount = $("#swapRight").val();
            $('strong[id^="swap-total"]').html(parseFloat(parseFloat(xDaiAmount)).toFixed(2) + " xDAI");
            let fee = 209496;
            let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
            let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
            let latestGas = await gasOracle.methods.latestAnswer().call();
            let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            let ethCost = (new Big(latestGas.toString()).mul(new Big(fee)));
            let cost = ((new Big(latestGas.toString()).mul(new Big(fee))).div(new Big(latestEthDai.toString()))).toFixed(2).toString();
            let mainnetBalance = await web3Mainnet.eth.getBalance(selectedAccount);
            if (new Big(mainnetBalance.toString()).lt(ethCost)) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html("You don't have enough ETH in your account for this transaction.")
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            $('strong[id^="swap-fee"]').html(cost);
            $('strong[id^="left-amount"]').html(parseFloat(xDaiAmount).toFixed(2) + " xDAI");
            $('strong[id^="right-amount"]').html(parseFloat(xDaiAmount).toFixed(2) + " DAI");
            $("#confirm_approval_swap").addClass("popup_open");
            swapId = 6;
        } else if ($("#swap-select-left").val() != "xgt") {
            let networkOk = await waitForSwitch(xdaiId, "swap");
            if (!networkOk) {
                return
            }
            xDaiAmount = $("#swapLeft").val();
            xgtAmount = new Big($("#swapRight").val()).mul(new Big(0.98).toString());
            $('strong[id^="swap-total"]').html(parseFloat(parseFloat(xDaiAmount)).toFixed(2) + " xDAI");
            $('strong[id^="swap-fee"]').html("<0.01");
            $('strong[id^="left-amount"]').html(parseFloat(xDaiAmount).toFixed(2) + " xDAI");
            $('strong[id^="right-amount"]').html(parseFloat(xgtAmount).toFixed(2) + " XGT");
            $("#treebox").show();
            if (gBalanceXDai >= parseFloat(xDaiAmount) + 0.8) {
                $("#planttree").prop("disabled", false);
            } else {
                $("#planttree").prop("disabled", true);
            }
            $("#confirm_swap_1").addClass("popup_open");
            swapId = 1;
        } else {
            let networkOk = await waitForSwitch(xdaiId, "swap");
            if (!networkOk) {
                return
            }
            xDaiAmount = new Big($("#swapRight").val()).mul(new Big(0.98).toString());
            xgtAmount = $("#swapLeft").val();
            $('strong[id^="swap-total"]').html(parseFloat(xgtAmount).toFixed(2) + " XGT");
            $('strong[id^="swap-fee"]').html("<0.01");
            $('strong[id^="left-amount"]').html(parseFloat(xgtAmount).toFixed(2) + " XGT");
            $('strong[id^="right-amount"]').html(parseFloat(xDaiAmount).toFixed(2) + " xDAI");
            xgtAmount = web3.utils.toWei(xgtAmount, "ether");
            let allowance = await xgtContract.methods.allowance(selectedAccount, addressRouter).call();
            if (new Big(allowance).lt(new Big(xgtAmount.toString()))) {
                $("#confirm_approval_swap").addClass("popup_open");
            } else {
                $("#confirm_swap_1").addClass("popup_open");
            }
            swapId = 2;
        }
    } else {
        if ($("#swap-select-left").val() == "dai" && $("#swap-select-right").val() == "xdai") {
            if (parseFloat($("#swapLeft").val()) < 0.005) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html("You need swap at least 0.005 DAI to xDAI.")
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            let networkOk = await waitForSwitch(mainnetId, "swap");
            if (!networkOk) {
                return
            }
            let daiAmount = $("#swapLeft").val();
            let fee = 55509;
            let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
            let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
            let latestGas = await gasOracle.methods.latestAnswer().call();
            let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            let cost = ((new Big(latestGas.toString()).mul(new Big(fee))).div(new Big(latestEthDai.toString()))).toFixed(2).toString();
            $('strong[id^="swap-total"]').html(parseFloat(parseFloat(daiAmount)).toFixed(2) + " DAI");
            $('strong[id^="swap-fee"]').html(cost);
            $('strong[id^="left-amount"]').html(parseFloat(daiAmount).toFixed(2) + " DAI");
            $('strong[id^="right-amount"]').html(parseFloat(daiAmount).toFixed(2) + " xDAI");
            $("#confirm_swap_1").addClass("popup_open");
            swapId = 5;
        } else if ($("#swap-select-left").val() == "xdai" && $("#swap-select-right").val() == "dai") {
            if (parseFloat($("#swapLeft").val()) < 10) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html("You need swap at least 10 xDAI to DAI.")
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            let networkOk = await waitForSwitch(xdaiId, "swap");
            if (!networkOk) {
                return
            }
            let xDaiAmount = $("#swapRight").val();
            $('strong[id^="swap-total"]').html(parseFloat(parseFloat(xDaiAmount)).toFixed(2) + " xDAI");
            let fee = 209496;
            let gasOracle = new web3Mainnet.eth.Contract(abiOracle, oracleGas, null);
            let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
            let latestGas = await gasOracle.methods.latestAnswer().call();
            let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            let ethCost = (new Big(latestGas.toString()).mul(new Big(fee)));
            let cost = ((new Big(latestGas.toString()).mul(new Big(fee))).div(new Big(latestEthDai.toString()))).toFixed(2).toString();
            let mainnetBalance = await web3Mainnet.eth.getBalance(selectedAccount);
            if (new Big(mainnetBalance.toString()).lt(ethCost)) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html("You don't have enough ETH in your account for this transaction.")
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            $('strong[id^="swap-fee"]').html(cost);
            $('strong[id^="left-amount"]').html(parseFloat(xDaiAmount).toFixed(2) + " xDAI");
            $('strong[id^="right-amount"]').html(parseFloat(xDaiAmount).toFixed(2) + " DAI");
            $("#confirm_approval_swap").addClass("popup_open");
            swapId = 6;
        } else if ($("#swap-select-right").val() != "xgt") {
            let networkOk = await waitForSwitch(xdaiId, "swap");
            if (!networkOk) {
                return
            }
            xDaiAmount = $("#swapRight").val();
            xgtAmount = new Big($("#swapLeft").val()).mul(new Big(1.02)).toString();
            $('strong[id^="swap-total"]').html(parseFloat(xgtAmount).toFixed(2) + " XGT");
            $('strong[id^="swap-fee"]').html("<0.01");
            $('strong[id^="left-amount"]').html(parseFloat(xgtAmount).toFixed(2) + " XGT");
            $('strong[id^="right-amount"]').html(parseFloat(xDaiAmount).toFixed(2) + " xDAI");
            xgtAmount = web3.utils.toWei(xgtAmount, "ether");
            let allowance = await xgtContract.methods.allowance(selectedAccount, addressRouter).call();
            if (new Big(allowance).lt(new Big(xgtAmount.toString()))) {
                $("#confirm_approval_swap").addClass("popup_open");
            } else {
                $("#confirm_swap_1").addClass("popup_open");
            }
            swapId = 3;
        } else {
            let networkOk = await waitForSwitch(xdaiId, "swap");
            if (!networkOk) {
                return
            }
            xgtAmount = $("#swapRight").val();
            xDaiAmount = web3.utils.fromWei(currentLeft);
            $('strong[id^="swap-total"]').html(parseFloat(parseFloat(xDaiAmount)).toFixed(2) + " xDAI");
            $('strong[id^="swap-fee"]').html("<0.01");
            $('strong[id^="left-amount"]').html(parseFloat(xDaiAmount).toFixed(2) + " xDAI");
            $('strong[id^="right-amount"]').html(parseFloat(xgtAmount).toFixed(2) + " XGT");
            $("#treebox").show();
            if (gBalanceXDai >= parseFloat(xDaiAmount) + 0.8) {
                $("#planttree").prop("disabled", false);
            } else {
                $("#planttree").prop("disabled", true);
            }
            $("#confirm_swap_1").addClass("popup_open");
            swapId = 4;
        }
    }
}

async function swap_Approve() {
    $("#confirm_approval_swap").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the approval transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("SWAP");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        swap_Approve();
    })

    if ($("#swap-select-left").val() == "xgt-to-mainnet") {
        await sendXGTToMainnet();
        return
    }

    let xgtAmount;
    if (fixedLeft) {
        xgtAmount = web3.utils.toWei($("#swapLeft").val(), "ether");
    } else {
        xgtAmount = web3.utils.toWei((parseFloat(new Big($("#swapLeft").val()).mul(new Big((1 + parseFloat($("#slippage").val()) / 100)).toString()))).toString(), "ether");
    }
    try {
        if (swapId != 5 && swapId != 6) {
            let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
            let txReturn = await xgtContract.methods.approve(addressRouter, xgtAmount).send({
                from: selectedAccount,
                gasPrice: "1000000000"
            });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('strong[id^="swap-total"]').html("0.00");
                $('strong[id^="swap-fee"]').html("0.00");
                $("#confirm_swap_2").addClass("popup_open");
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }
        } else if (swapId == 5) {
            let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
            let txReturn = await daiContract.methods.approve(addressDAIBridgeMainnet, web3.utils.toWei($("#swapLeft").val(), "ether")).send({
                from: selectedAccount
            });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('strong[id^="swap-total"]').html("0.00");
                $('strong[id^="swap-fee"]').html("0.00");
                $("#confirm_swap_2").addClass("popup_open");
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }
        } else if (swapId == 6) {
            let xDaiAmount = web3.utils.toWei($("#swapRight").val(), "ether");
            let txReturn = await web3.eth.sendTransaction({
                to: addressDAIBridgeXDai,
                from: selectedAccount,
                value: xDaiAmount
            });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                while (withdrawHash == null || withdrawHash.indexOf("0x") == -1) {
                    withdrawHash = txReturn.transactionHash;
                    if (withdrawHash == null || withdrawHash.indexOf("0x") == -1) {
                        await sleep(1000);
                    }
                }
                $('strong[id^="swap-total"]').html("0.00");
                $('strong[id^="swap-fee"]').html("0.00");
                $("#confirm_swap_2").addClass("popup_open");
                return
            } else {
                $("#error-popup").addClass("popup_open");
                return
            }
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");

}

async function swap_Final() {
    $("#planttree").prop("disabled", true);
    $("#confirm_swap_1").removeClass("popup_open");
    $("#confirm_swap_2").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the swap transaction to finish...")
    if (swapId != 6) {
        $("#wait-popup").addClass("popup_open");
    }
    $("#error-target").html("SWAP");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        swap_Final();
    })
    if ($("#planttree").is(':checked') && $("#singleswap_first").html() == "1/<strong>2</strong>") {
        $("#error-target").html("DONATION");
        $("#wait_purpose").html("Waiting for the donation transaction to finish...")
        await treeTx();
        refreshBalance();
        return
    }
    if ($("#swap-select-left").val() == "xgt-to-mainnet") {
        $("#waittime").html("1 - 10 Minutes")
        await sendXGTToMainnet_2();
    } else if ($("#swap-select-left").val() == "xgt-to-xdai") {
        $("#waittime").html("1 - 5 Minutes")
        await sendXGTToXDai();
    } else if (swapId == 1) {
        await swapExactXDaiForXGT();
    } else if (swapId == 2) {
        await swapExactXGTForXDai();
    } else if (swapId == 3) {
        await swapXGTForExactXDai();
    } else if (swapId == 4) {
        await swapXDaiForExactXGT();
    } else if (swapId == 5) {
        $("#waittime").html("1 - 5 Minutes")
        await swapDaiForXDai();
    } else if (swapId == 6) {
        $("#waittime").html("1 - 5 Minutes")
        await swapXDaiForDai();
    }
    $("#singleswap_first").html("1/<strong>1</strong>")
    $("#waittime").html("5 - 10 Seconds")
    refreshBalance();
}

async function treeTx() {
    let networkOk = await waitForSwitch(xdaiId, "swap");
    if (!networkOk) {
        return
    }
    let targetAddress = "0x15B0feDa0ff231E5bCC955f965857d45f366d35E";
    if (window.location.href.indexOf("xion.finance") == -1) {
        targetAddress = selectedAccount
    }
    try {
        let txReturn = await web3.eth.sendTransaction({
            to: targetAddress,
            from: selectedAccount,
            value: web3.utils.toWei("0.80", "ether"),
            gasPrice: "1000000000"
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $("#donationlink").on("click", function () {
                window.open(txUrlXDai + txReturn.transactionHash, "_blank");
            })
            $('strong[id^="swap-fee"]').html("0.00");
            $("#singleswap_first").html("2/<strong>2</strong>")
            $("#confirm_swap_1").addClass("popup_open");
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        console.log(e)
        $("#error-popup").addClass("popup_open");
    }
    $("#wait-popup").removeClass("popup_open");
}


async function sendXGTToMainnet() {
    let networkOk = await waitForSwitch(xdaiId, "swap");
    if (!networkOk) {
        return
    }
    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let xgtAmount = new Big($("#swapLeft").val()).mul(new Big(10 ** 18)).toFixed(0).toString();
    let xgtBalance = await xgtContract.methods.balanceOf(selectedAccount).call();
    if (new Big(xgtBalance.toString()).lt(new Big(xgtAmount))) {
        xgtAmount = xgtBalance
    }
    try {
        let txReturn = await xgtContract.methods.transferToMainnet(
            xgtAmount.toString()).send({
            from: selectedAccount,
            gasPrice: "1000000000"
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            while (swapHash == null || swapHash.indexOf("0x") == -1) {
                swapHash = txReturn.transactionHash;
                if (swapHash == null || swapHash.indexOf("0x") == -1) {
                    await sleep(1000);
                }
            }
            let txLogs = await web3xDai.eth.getTransactionReceipt(swapHash)
            swapMessageId = txLogs.logs[1].topics[1]
            swapEncodedData = ("0x" + (txLogs.logs[1].data).substring(130)).slice(0, -22)
            $('strong[id^="swap-total"]').html("0.00");
            $('strong[id^="swap-fee"]').html("0.00");
            let networkOk = await waitForSwitch(mainnetId, "swap");
            if (!networkOk) {
                return
            }
            $("#confirm_swap_2").addClass("popup_open");
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function sendXGTToMainnet_2() {
    let networkOk = await waitForSwitch(mainnetId, "swap");
    if (!networkOk) {
        return
    }
    let helperContract = new web3xDai.eth.Contract(abiAMBHelper, addressAMBHelper, null);
    let signatures = null;
    while (signatures == null || signatures.indexOf("0x") == -1) {
        await sleep(2000)
        try {
            signatures = await helperContract.methods.getSignatures(swapEncodedData).call()
        } catch (e) {
            // Do nothing
        }
    }
    let ambContract = new web3.eth.Contract(abiAMBMainnet, addressAMBMainnet, null);

    try {
        let txReturn = await ambContract.methods.executeSignatures(swapEncodedData, signatures).send({
            from: selectedAccount
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlMainnet + txReturn.transactionHash, "_blank");
            })
            $("#swap-xgt-success").addClass("popup_open");
            refreshBalance();
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function sendXGTToXDai() {
    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let xgtAmount = new Big($("#swapLeft").val()).mul(new Big(10 ** 18)).toFixed(0).toString();
    let xgtBalance = await xgtContract.methods.balanceOf(selectedAccount).call();
    if (new Big(xgtBalance.toString()).lt(new Big(xgtAmount))) {
        xgtAmount = xgtBalance
    }
    try {
        let txReturn = await xgtContract.methods.transferToXDai(
            xgtAmount.toString()).send({
            from: selectedAccount
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlMainnet + txReturn.transactionHash, "_blank");
            })
            $("#swap-xgt-success").addClass("popup_open");
            refreshBalance();
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapDaiForXDai() {
    let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);

    // ///////////////
    // const message = {
    //     holder: selectedAccount,
    //     spender: addressXGTStakeMainnet,
    //     nonce: parseInt((await daiContract.methods.nonces(selectedAccount).call()).toString()),
    //     expiry: Math.round(new Date().getTime() / 1000) + 60 * 60,
    //     allowed: true,
    // };
    // const typedData = JSON.stringify({
    //     types: {
    //         EIP712Domain: [{
    //                 name: "name",
    //                 type: "string",
    //             },
    //             {
    //                 name: "version",
    //                 type: "string",
    //             },
    //             {
    //                 name: "chainId",
    //                 type: "uint256",
    //             },
    //             {
    //                 name: "verifyingContract",
    //                 type: "address",
    //             },
    //         ],
    //         Permit: [{
    //                 name: "holder",
    //                 type: "address",
    //             },
    //             {
    //                 name: "spender",
    //                 type: "address",
    //             },
    //             {
    //                 name: "nonce",
    //                 type: "uint256",
    //             },
    //             {
    //                 name: "expiry",
    //                 type: "uint256",
    //             },
    //             {
    //                 name: "allowed",
    //                 type: "bool",
    //             },
    //         ],
    //     },
    //     primaryType: "Permit",
    //     domain: {
    //         name: "Dai Stablecoin",
    //         version: "1",
    //         chainId: 1,
    //         verifyingContract: addressDAI,
    //     },
    //     message: message,
    // });

    // await web3.currentProvider.send({
    //         jsonrpc: "2.0",
    //         id: 999999999999,
    //         method: "eth_signTypedData_v4",
    //         params: [selectedAccount, typedData]
    //     },
    //     async function (error, response) {
    //         if (error || (response && response.error)) {
    //             console.log(error)
    //             return
    //         } else if (response && response.result) {
    //             const r = response.result.slice(0, 66);
    //             const s = "0x" + response.result.slice(66, 130);
    //             const v = Number("0x" + response.result.slice(130, 132));
    //             console.log(r)
    //             console.log(s)
    //             console.log(v)
    //         }
    //     }
    // );

    ///////////////
    let daiAmount = new Big($("#swapLeft").val()).mul(new Big(10 ** decimalsDai)).toFixed(0).toString();
    let daiBalance = await daiContract.methods.balanceOf(selectedAccount).call();
    if (new Big(daiBalance.toString()).lt(new Big(daiAmount))) {
        daiAmount = daiBalance
    }
    try {
        let txReturn = await daiContract.methods.transfer(
            addressDAIBridgeMainnet, daiAmount.toString()).send({
            from: selectedAccount
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlMainnet + txReturn.transactionHash, "_blank");
            })
            $("#swap-success").addClass("popup_open");
            refreshBalance();
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapXDaiForDai() {
    let networkOk = await waitForSwitch(mainnetId, "swap");
    if (!networkOk) {
        return
    }
    $("#wait-popup").addClass("popup_open");
    let helperContract = new web3xDai.eth.Contract(abiXDaiHelper, addressXDaiHelper, null);
    let xDaiAmount = web3xDai.utils.toWei($("#swapRight").val(), "ether");
    try {
        let txReturn;
        if (withdrawHash.length > 0) {
            let messageHash = await helperContract.methods.getMessageHash(selectedAccount, xDaiAmount, withdrawHash).call();
            let message = "";
            while (message.length == 0) {
                message = await helperContract.methods.getMessage(messageHash).call();
                if (typeof message == "undefined" || message.length == 0) {
                    await sleep(2000);
                }
            }
            let signatures = "";
            while (signatures.length == 0) {
                signatures = await helperContract.methods.getSignatures(messageHash).call();
                if (typeof signatures == "undefined" || signatures.length == 0) {
                    await sleep(1000);
                }
            }
            let bridgeContract = new web3.eth.Contract(abiDAIBridgeMainnet, addressDAIBridgeMainnet, null);
            txReturn = await bridgeContract.methods.executeSignatures(message, signatures).send({
                from: selectedAccount
            });
        }
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlMainnet + txReturn.transactionHash, "_blank");
            })
            $("#swap-success").addClass("popup_open");
            refreshBalance();
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapExactXDaiForXGT() {
    let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);
    let xDaiAmount = web3.utils.toWei($("#swapLeft").val(), "ether");
    if (web3.utils.toWei(gBalanceXDai.toString(), "ether") <= parseFloat(xDaiAmount)) {
        xDaiAmount = web3.utils.toWei((gBalanceXDai - 0.01).toString(), "ether");
    }
    let rate = await routerContract.methods
        .getAmountsOut(xDaiAmount, [addressWETH, addressXGT])
        .call();
    let xgtAmount = new Big(rate[1]).mul(new Big(1 - parseFloat($("#slippage").val()) / 100)).toFixed(0).toString();
    try {
        let txReturn = await routerContract.methods.swapExactETHForTokens(
            xgtAmount,
            [addressWETH, addressXGT],
            selectedAccount,
            Math.round(new Date().getTime() / 1000) + 60 * 60).send({
            from: selectedAccount,
            value: xDaiAmount,
            gasPrice: "1000000000"
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlXDai + txReturn.transactionHash, "_blank");
            })
            if ($("#planttree").is(':checked')) {
                $("#swap-success-w-tree").addClass("popup_open");
            } else {
                $("#swap-success").addClass("popup_open");
            }
            refreshBalance();
            return
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function earnMeta() {
    let networkOk = await waitForSwitch(mainnetId, "earn");
    if (!networkOk) {
        return
    }
    $("#confirm_earn_1").removeClass("popup_open");
    $("#confirm_earn_2").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the earn transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("EARNING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        earnMeta();
    })
    refreshBalance();
    let amount = new Big($("#earn-input").val()).mul(new Big(10 ** decimalsDai));
    if (parseFloat(gBalanceDAI - parseFloat($("#earn-input").val())) <= 0.1) {
        let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
        amount = await daiContract.methods.balanceOf(selectedAccount).call();
    }

    let XGTStakeMainnetContract = new web3.eth.Contract(
        abiXGTStakeMainnet,
        addressXGTStakeMainnet,
        null
    );
    let XGTStakeMainnetContractEIP712 = new web3.eth.Contract(
        abiEIP712,
        addressXGTStakeMainnet,
        null
    );
    try {
        let nonce = await XGTStakeMainnetContractEIP712.methods.getNonce(selectedAccount).call();
        let functionSignature = await XGTStakeMainnetContract.methods.depositTokens(amount.toString()).encodeABI();

        let txMessage = {};
        txMessage.nonce = parseInt(nonce);
        txMessage.from = selectedAccount;
        txMessage.functionSignature = functionSignature;

        const dataToSign = JSON.stringify({
            types: {
                EIP712Domain: domainType,
                MetaTransaction: metaTransactionType
            },
            domain: domainData,
            primaryType: "MetaTransaction",
            message: txMessage
        });
        await web3.currentProvider.send({
                jsonrpc: "2.0",
                id: 999999999999,
                method: "eth_signTypedData_v4",
                params: [selectedAccount, dataToSign]
            },
            async function (error, response) {
                if (error || (response && response.error)) {
                    $("#wait-popup").removeClass("popup_open");
                    $("#error-popup").addClass("popup_open");
                    return
                } else if (response && response.result) {
                    let {
                        r,
                        s,
                        v
                    } = getSignatureParameters(response.result);
                    const url = metaTxAPI;
                    const data = {
                        "ContractAddress": addressXGTStakeMainnet,
                        "UserAddress": selectedAccount,
                        "FunctionSignature": functionSignature,
                        "SigR": r,
                        "SigS": s,
                        "SigV": v
                    };
                    const other_params = {
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(data),
                        method: "POST",
                    };
                    fetch(url, other_params)
                        .then(response => response.json())
                        .then(json => {
                            console.log(json)
                            if (json.Status == "ok") {
                                $("#wait-popup").removeClass("popup_open");
                                $('[id^="txlink"]').prop("onclick", null).off("click");
                                $('[id^="txlink"]').on("click", function () {
                                    window.open(txUrlMainnet + json.TxHash, "_blank");
                                })
                                $("#earn-success").addClass("popup_open");
                                return
                            } else {
                                $("#error-popup").addClass("popup_open");
                            }
                        })
                }
            }
        );
    } catch (e) {
        $("#wait-popup").removeClass("popup_open");
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
}

async function withdrawMeta() {
    $("#confirm_withdraw_1").removeClass("popup_open");
    $("#confirm_withdraw_2").removeClass("popup_open");
    $("#confirm_withdraw_2_1_all").removeClass("popup_open");
    $("#confirm_withdraw_2_2_all").removeClass("popup_open");
    $("#confirm_withdraw_3_2_all").removeClass("popup_open");
    $("#confirm_withdraw_3_3_all").removeClass("popup_open");
    let networkOk = await waitForSwitch(mainnetId, "withdraw");
    if (!networkOk) {
        return
    }
    $("#wait_purpose").html("Waiting for the withdraw transaction to finish...")
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("WITHDRAW");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        withdraw();
    })
    let amount = parseFloat($("#withdraw-input").val()).toFixed(2);

    refreshBalance();

    if (parseFloat(stakeValue.toString()) - amount <= 0.15) {
        amount = web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1));
    } else {
        amount = (new Big(amount.toString()).mul(new Big(10 ** decimalsDai))).toFixed(0).toString();
    }
    let XGTStakeMainnetContract = new web3.eth.Contract(
        abiXGTStakeMainnet,
        addressXGTStakeMainnet,
        null
    );

    let XGTStakeMainnetContractEIP712 = new web3.eth.Contract(
        abiEIP712,
        addressXGTStakeMainnet,
        null
    );
    try {
        let nonce = await XGTStakeMainnetContractEIP712.methods.getNonce(selectedAccount).call();
        let functionSignature = await XGTStakeMainnetContract.methods.withdrawTokens(amount.toString()).encodeABI();

        let txMessage = {};
        txMessage.nonce = parseInt(nonce);
        txMessage.from = selectedAccount;
        txMessage.functionSignature = functionSignature;

        const dataToSign = JSON.stringify({
            types: {
                EIP712Domain: domainType,
                MetaTransaction: metaTransactionType
            },
            domain: domainData,
            primaryType: "MetaTransaction",
            message: txMessage
        });
        await web3.currentProvider.send({
                jsonrpc: "2.0",
                id: 999999999999,
                method: "eth_signTypedData_v4",
                params: [selectedAccount, dataToSign]
            },
            async function (error, response) {
                if (error || (response && response.error)) {
                    $("#wait-popup").removeClass("popup_open");
                    $("#error-popup").addClass("popup_open");
                    return
                } else if (response && response.result) {
                    let {
                        r,
                        s,
                        v
                    } = getSignatureParameters(response.result);
                    const url = metaTxAPI;
                    const data = {
                        "ContractAddress": addressXGTStakeMainnet,
                        "UserAddress": selectedAccount,
                        "FunctionSignature": functionSignature,
                        "SigR": r,
                        "SigS": s,
                        "SigV": v
                    };
                    const other_params = {
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(data),
                        method: "POST",
                    };
                    fetch(url, other_params)
                        .then(response => response.json())
                        .then(json => {
                            console.log(json)
                            if (json.Status == "ok") {
                                console.log("DIS")
                                $("#wait-popup").removeClass("popup_open");
                                $('[id^="txlink"]').prop("onclick", null).off("click");
                                $('[id^="txlink"]').on("click", function () {
                                    window.open(txUrlMainnet + json.TxHash, "_blank");
                                })
                                $("#withdraw-success").addClass("popup_open");
                                return
                            } else {
                                $("#error-popup").addClass("popup_open");
                            }
                        })
                }
            }
        );
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
    $("#withdraw-input").val("");
}

function getSignatureParameters(signature) {
    if (!web3.utils.isHexStrict(signature)) {
        throw new Error(
            'Given value "'.concat(signature, '" is not a valid hex string.')
        );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = web3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
        r: r,
        s: s,
        v: v.toString(16)
    };
};

async function swapXDaiForExactXGT() {
    let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);
    let xgtAmount = web3.utils.toWei($("#swapRight").val(), "ether");
    let rate = await routerContract.methods
        .getAmountsIn(xgtAmount, [addressWETH, addressXGT])
        .call();
    currentLeft = new Big(rate[0]).mul(new Big(1 + parseFloat($("#slippage").val()) / 100)).toFixed(0);
    try {
        let txReturn = await routerContract.methods.swapETHForExactTokens(
            xgtAmount,
            [addressWETH, addressXGT],
            selectedAccount,
            Math.round(new Date().getTime() / 1000) + 60 * 60).send({
            from: selectedAccount,
            value: currentLeft.toString(),
            gasPrice: "1000000000"
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlXDai + txReturn.transactionHash, "_blank");
            })
            if ($("#planttree").is(':checked')) {
                $("#swap-success-w-tree").addClass("popup_open");
            } else {
                $("#swap-success").addClass("popup_open");
            }
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapExactXGTForXDai() {
    let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);
    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let xgtBalance = await xgtContract.methods.balanceOf(selectedAccount).call()
    let xgtAmount = web3.utils.toWei($("#swapLeft").val(), "ether");
    if (new Big(xgtBalance.toString()).lt(new Big(xgtAmount.toString()))) {
        xgtAmount = xgtBalance;
    }
    let rate = await routerContract.methods
        .getAmountsOut(xgtAmount, [addressXGT, addressWETH])
        .call();
    let xDaiAmount = new Big(rate[1]).mul(new Big(1 - parseFloat($("#slippage").val()) / 100)).toFixed(0).toString();
    try {
        let txReturn = await routerContract.methods.swapExactTokensForETH(
            xgtAmount,
            xDaiAmount,
            [addressXGT, addressWETH],
            selectedAccount,
            Math.round(new Date().getTime() / 1000) + 60 * 60).send({
            from: selectedAccount,
            gasPrice: "1000000000"
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlXDai + txReturn.transactionHash, "_blank");
            })
            $("#swap-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapXGTForExactXDai() {
    let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);
    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let xgtBalance = await xgtContract.methods.balanceOf(selectedAccount).call()

    let xDaiAmount = web3.utils.toWei($("#swapRight").val(), "ether");
    let rate = await routerContract.methods
        .getAmountsIn(xDaiAmount, [addressXGT, addressWETH])
        .call();
    currentLeft = rate[0];
    let xgtAmount = web3.utils.toWei(new Big(rate[0]).mul(new Big(1 + parseFloat($("#slippage").val()) / 100)).toFixed(0).toString(), "ether");
    if (new Big(xgtBalance.toString()).lt(new Big(xgtAmount.toString()))) {
        xgtAmount = xgtBalance;
    }
    try {
        let txReturn = await routerContract.methods.swapTokensForExactETH(
            xDaiAmount,
            xgtAmount,
            [addressXGT, addressWETH],
            selectedAccount,
            Math.round(new Date().getTime() / 1000) + 60 * 60).send({
            from: selectedAccount,
            gasPrice: "1000000000"
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlXDai + txReturn.transactionHash, "_blank");
            })
            $("#swap-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e)
    }
    $("#wait-popup").removeClass("popup_open");
}

async function getRateFixedLeft() {
    if ($("#swap-select-left").val() == "xgt-to-mainnet") {
        $("#swapRight").val($("#swapLeft").val() + " XGT to Mainnet");
        if (parseFloat($("#swapLeft").val()) > gBalanceXGTXDai) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
        return
    } else if ($("#swap-select-left").val() == "xgt-to-xdai") {
        $("#swapRight").val($("#swapLeft").val() + " XGT to xDai");
        if (parseFloat($("#swapLeft").val()) > gBalanceXGTETH) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
        return
    }
    fixedLeft = true;
    let routerContract = new web3xDai.eth.Contract(abiRouter, addressRouter, null);
    if (($("#swap-select-left").val() == "dai" && $("#swap-select-right").val() == "xdai") || ($("#swap-select-left").val() == "xdai" && $("#swap-select-right").val() == "dai")) {
        $("#swapRight").val($("#swapLeft").val());
        if ($("#swap-select-left").val() == "dai" && gBalanceDAI < parseFloat($("#swapLeft").val()).toFixed(2)) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
    } else if ($("#swap-select-right").val() == "xgt") {
        let xdaiAmount = web3xDai.utils.toWei($("#swapLeft").val(), "ether");
        if (gBalanceXDai < parseFloat($("#swapLeft").val()).toFixed(2)) {
            // $("#swapRight").addClass("redInput");
            $("#swapLeft").addClass("redInput");
        } else {
            // $("#swapRight").removeClass("redInput");
            $("#swapLeft").removeClass("redInput");
        }
        let rate = await routerContract.methods
            .getAmountsOut(xdaiAmount, [addressWETH, addressXGT])
            .call();
        currentRight = rate[1];
        $("#swapRight").val(parseFloat(web3xDai.utils.fromWei(currentRight)).toFixed(2));
    } else if ($("#swap-select-left").val() == "xgt") {
        // console.log($("#swapLeft").val())
        // let indexXGT = ($("#swapLeft").val()).indexOf(" XGT");
        // console.log(indexXGT)
        // let xgtAmount;
        // if (indexXGT > -1) {
        //     xgtAmount = web3xDai.utils.toWei($("#swapLeft").val().substr(0, indexXGT - 1), "ether");
        // } else {
        //     xgtAmount = web3xDai.utils.toWei($("#swapLeft").val(), "ether");
        // }
        let xgtAmount = web3xDai.utils.toWei($("#swapLeft").val(), "ether");

        // $("#swapLeft").val($("#swapLeft").val + " XGT ($" + $("#swapLeft").val() + ")")
        if (gBalanceXGTXDai < parseFloat($("#swapLeft").val()).toFixed(2)) {
            // $("#swapRight").addClass("redInput");
            $("#swapLeft").addClass("redInput");
        } else {
            // $("#swapRight").removeClass("redInput");
            $("#swapLeft").removeClass("redInput");
        }
        let rate = await routerContract.methods
            .getAmountsOut(xgtAmount, [addressXGT, addressWETH])
            .call();
        currentRight = rate[1];
        $("#swapRight").val(parseFloat(web3xDai.utils.fromWei(currentRight)).toFixed(2));
    } else {
        $("#swapRight").val($("#swapLeft").val());
    }
}

async function getRateFixedRight() {
    fixedLeft = false;
    let routerContract = new web3xDai.eth.Contract(abiRouter, addressRouter, null);
    if (($("#swap-select-left").val() == "dai" && $("#swap-select-right").val() == "xdai") || ($("#swap-select-left").val() == "xdai" && $("#swap-select-right").val() == "dai")) {
        $("#swapLeft").val($("#swapRight").val());
        if ($("#swap-select-left").val() == "dai" && gBalanceDAI < parseFloat($("#swapLeft").val()).toFixed(2)) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
    } else if ($("#swap-select-left").val() != "xgt") {
        let xgtAmount = web3xDai.utils.toWei(new Big($("#swapRight").val()).toFixed(6).toString(), "ether");

        let rate = await routerContract.methods
            .getAmountsIn(xgtAmount, [addressWETH, addressXGT])
            .call();
        currentLeft = rate[0];
        if (gBalanceXDai < parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)) {
            // currentLeft = gBalanceXDai;
            // $("#swapLeft").val(currentLeft);
            // getRateFixedLeft();
            // return;
            // $("#swapRight").addClass("redInput");
            $("#swapLeft").addClass("redInput");
        } else {
            // $("#swapRight").removeClass("redInput");
            $("#swapLeft").removeClass("redInput");
        }
        $("#swapLeft").val(parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2));
    } else {
        let daiAmount = web3xDai.utils.toWei($("#swapRight").val(), "ether");

        let rate = await routerContract.methods
            .getAmountsIn(daiAmount, [addressXGT, addressWETH])
            .call();
        currentLeft = rate[0];
        if (gBalanceXGTXDai < parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)) {
            // currentLeft = gBalanceXGTXDai;
            // $("#swapLeft").val(currentLeft);
            // getRateFixedLeft();
            // return;
            // $("#swapRight").addClass("redInput");
            $("#swapLeft").addClass("redInput");
        } else {
            // $("#swapRight").removeClass("redInput");
            $("#swapLeft").removeClass("redInput");
        }
        $("#swapLeft").val(parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2));
    }
}

async function removeLiquidity(amount) {
    let poolTokenContract = new web3.eth.Contract(abiPair, addressPair, null);
    let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);

    let poolBalance = await poolTokenContract.methods.balanceOf(selectedAccount).call();
    let allowance = await poolTokenContract.methods.allowance(selectedAccount, addressRouter).call();
    let desiredAmount = web3.utils.toWei(amount.toString(), 'ether');

    if (new Big(desiredAmount).gt(new Big(poolBalance))) {
        desiredAmount = poolBalance;
    }
    if (new Big(desiredAmount).eq(new Big(0))) {
        return
    }

    if (new Big(desiredAmount).gt(new Big(allowance))) {
        let difference = new Big(desiredAmount).minus(new Big(allowance));
        await poolTokenContract.methods.approve(addressRouter, difference.toString()).send({
            from: selectedAccount,
            gasPrice: "1000000000"
        });
    }

    await routerContract.methods.removeLiquidityETH(addressXGT, desiredAmount, 0, 0, selectedAccount, Math.round(new Date().getTime() / 1000) + 60 * 60).send({
        from: selectedAccount,
        gasPrice: "1000000000"
    });

}

async function payout() {
    $("#newpopup").addClass("popup_open");
}
/**
 * Connect wallet button pressed.
 */
async function onConnect() {
    try {
        if (web3Modal.providerController.cachedProvider == "torus") {
            $(".preloader").css('z-index', 9999);
        }
        provider = await web3Modal.connect();
        if (web3Modal.providerController.cachedProvider == "torus") {
            $(".preloader").css('z-index', 999999999999999);
        }
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        // Refresh connection
        onDisconnect()
        await sleep(1000)
        $("#connect-wallet").text("GET STARTED");
        localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
        web3Modal.clearCachedProvider();
        provider = null;

        $("#balance").html("0.00");
        $("#earnings").html("0.00");
        $("#xgt-balance").html("0.00");
        $(".preloader").hide();
        // Refresh End
        return;
    }
    $(".preloader").show()
    INIT_DONE = true;
    if (firstConnect) {
        $(".preloader").hide();
        $("#connect-success").addClass("popup_open")
    }
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
        refreshBalance();
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
        fetchAccountData();
        // refreshBalance();
    });
    await refreshAccountData();
    refreshBalance();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {
    await web3Modal.clearCachedProvider();
    provider = null;
    selectedAccount = null;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkConnected() {
    if (typeof provider == "undefined" || provider == null) {
        await onConnect();
    }
}
/**
 * Main entry point.
 */
window.addEventListener("load", async () => {
    if (typeof Sentry != "undefined") {
        Sentry.init({
            dsn: "https://c1af45523e7e449ca5beac882d34def2@o517705.ingest.sentry.io/5625926",
            // integrations: [new Integrations.BrowserTracing()],
            // tracesSampleRate: 1.0,
        });
    }

    $(function () {
        $("#footer").load("footer.html");
    });

    if (window.location.href.indexOf("faq?switchToxDai") != -1) {
        $("#network-faq-click").click();
    }

    await init();
    if (window.location.href.indexOf("earn") == -1 && window.location.href.indexOf("farm") == -1 && window.location.href.indexOf("withdraw") == -1) {
        $(".preloader").hide();
    }

    if ($("#tt").length) {
        $('[id^="tt"]').parent().next().hide()
        $('[id^="tt"]').change(function () {
            if (this.checked) {
                $(this).parent().next().show()
            } else {
                $(this).parent().next().hide()
            }
        })
    }

    if ($("#planttree").length) {
        $('[id^="planttree"]').change(function () {
            if (this.checked) {
                $('strong[id^="swap-total"]').html(parseFloat(parseFloat($('strong[id^="swap-total"]').html().slice(0, -5)) + 0.8).toFixed(2) + " xDAI");
                $("#singleswap_first").html("1/<strong>2</strong>")
            } else {
                $('strong[id^="swap-total"]').html(parseFloat(parseFloat($('strong[id^="swap-total"]').html().slice(0, -5)) - 0.8).toFixed(2) + " xDAI");
                $("#singleswap_first").html("1/<strong>1</strong>")
            }
        })
    }

    if ($("#gaseth").length) {
        $('[id^="gaseth"]').change(function () {
            if (this.checked) {
                paySelf = true
                $('[id^="gaseth"]').prop('checked', true);
            } else {
                paySelf = false
                $('[id^="gaseth"]').prop('checked', false);
            }
        })
    }
    $("#connect-wallet").hover(
        function () {
            if (typeof provider != "undefined" && provider != null) {
                $("#connect-wallet").text("DISCONNECT");
            }
        },
        function () {
            if (typeof provider != "undefined" && provider != null) {
                $("#connect-wallet").text("CONNECTED");
            }
        }
    );

    $("#connect-wallet").on("click", function () {
        if (typeof provider != "undefined" && provider != null) {
            onDisconnect()
            sleep(1000)
            $("#connect-wallet").text("GET STARTED");
            localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
            web3Modal.clearCachedProvider();
            provider = null;

            $("#balance").html("0.00");
            $("#earnings").html("0.00");
            $("#xgt-balance").html("0.00");
        } else {
            init(true)
            firstConnect = true;
            // onConnect()
        }
    });

    if (window.location.href.indexOf("earn") > -1) {
        document
            .querySelector("#earn-button")
            .addEventListener("click", startEarning);

        $("#earn-input").on("input", async function () {
            if (parseFloat($("#earn-input").val()) < 0) {
                $("#earn-input").val("");
            }
            await waitForCompleteLoad();
            if (parseFloat($("#earn-input").val()) > gBalanceDAI) {
                // $("#earn-input").val(gBalanceDAI);
                $("#earn-input").addClass("redInput");
            } else {
                $("#earn-input").removeClass("redInput");
            }
            if ($("#earn-projection-select").val() == "xgt") {
                $("#earn-projection").attr(
                    "placeholder",
                    parseFloat($("#earn-input").val() * combinedAPY / xgtPrice).toFixed(2) + " XGT"
                );
            } else {
                $("#earn-projection").attr(
                    "placeholder",
                    "$" + parseFloat($("#earn-input").val() * combinedAPY).toFixed(2)
                );
            }
            $("#earnTotal").html(" <i>$ </i>" + parseFloat($("#earn-input").val()).toFixed(2))

        });
        $("#earn-projection-select").on("change", async function () {
            await waitForCompleteLoad();
            if ($("#earn-projection-select").val() == "xgt") {
                $("#earn-logo-right").html(xgtSymbol)
            } else {
                $("#earn-logo-right").html(usdSymbol)
            }
            $("#earn-input").trigger("input");
        })
    }
    if (window.location.href.indexOf("farm") > -1) {
        $("#xgt").change(async function () {
            if (!$("#xgt").is(':checked')) {
                $("#provideLiquidityXGT").removeClass("redInput");
            }
            // $("#provideLiquidityXGT").prop("disabled", !$("#xgt").is(':checked'));
            await waitForCompleteLoad();
            $("#provideLiquidityXDai").trigger("input");
        })

        document
            .querySelector("#provideLiquidity")
            .addEventListener("click", provideLiquidity);
        $("#provideLiquidityXDai").on("input", async function () {
            if (parseFloat($("#provideLiquidityXDai").val()) < 0) {
                $("#provideLiquidityXDai").val("");
                $("#provideLiquidityXGT").val("");
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                return
            }
            if ($("#provideLiquidityXDai").val() == "") {
                $("#provideLiquidityXDai").val("");
                $("#provideLiquidityXGT").val("");
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                return
            }

            if (parseFloat($("#provideLiquidityXDai").val()) == 0) {
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                $("#provideLiquidityXGT").val("");
                return
            }

            if (parseFloat($("#provideLiquidityXDai").val()) < 0.02) {
                $("#provideLiquidityXDai").addClass("redInput");
                $("#provideLiquidityXGT").val("");
                return
            }
            await waitForCompleteLoad();
            // $("#provideLiquidityXDai").val(parseFloat($("#provideLiquidityXDai").val()).toFixed(2));
            if (parseFloat($("#provideLiquidityXDai").val()) > gBalanceXDai) {
                // $("#provideLiquidityXDai").val(gBalanceXDai - 0.01);
                $("#provideLiquidityXDai").addClass("redInput");
            } else {
                $("#provideLiquidityXDai").removeClass("redInput");
            }

            if ($("#provideLiquidityXDai").val() > 0) {
                let investAmount = $("#provideLiquidityXDai").val();
                if ($("#xgt").is(':checked')) {
                    let xgtValue = new Big($("#provideLiquidityXDai").val()).div(new Big(lpRatio)).toString()
                    if (xgtValue > gBalanceXGTXDai) {
                        // xgtValue = gBalanceXGTXDai;
                        // $("#provideLiquidityXDai").val(new Big(xgtValue).mul(new Big(lpRatio)).toString())
                        $("#provideLiquidityXGT").addClass("redInput");
                    } else {
                        $("#provideLiquidityXGT").removeClass("redInput");
                    }
                    $("#provideLiquidityXGT").val(parseFloat(xgtValue).toFixed(0));
                    investAmount = $("#provideLiquidityXDai").val() * 2
                } else {
                    $("#provideLiquidityXGT").val("");
                }
                $("#liquidityTotal").html(
                    "<i>$ </i>" + parseFloat(investAmount).toFixed(2)
                );

                $("#rewards_month").val("$ " +
                    (parseFloat(investAmount) * lpAPM).toFixed(2)
                );
                let poolShare = ((new Big(investAmount).mul(new Big(10 ** 18)).mul(new Big(lpTotalShares.toString()))).div(new Big(lpReserve.toString()))).div(new Big(lpTotalShares.toString())).mul(new Big(50)).toFixed(0);
                if (new Big(poolShare).gt(new Big("100"))) {
                    poolShare = new Big("100")
                }
                if (new Big(poolShare).eq(0)) {
                    poolShare = "< 0.01"
                }
                $("#poolshare").html(poolShare.toString());
            } else {
                $("#rewards_month").val("$ 0.00");
                $("#provideLiquidityXGT").val("");
                $("#liquidityTotal").html("<i>$ </i> 0.00");
                $("#poolshare").html("0");
            }
            // $("#provideLiquidityXGT").trigger("input");
        });
        $("#provideLiquidityXGT").on("input", async function () {
            if (parseFloat($("#provideLiquidityXGT").val()) < 0) {
                $("#provideLiquidityXGT").val("");
                $("#provideLiquidityXDai").val("");
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                return
            }
            if ($("#provideLiquidityXGT").val() == "") {
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                return
            }

            await waitForCompleteLoad();
            // $("#provideLiquidityXGT").val(parseFloat($("#provideLiquidityXGT").val()).toFixed(2));
            if (parseFloat($("#provideLiquidityXGT").val()) > gBalanceXGTXDai) {
                // $("#provideLiquidityXGT").val(gBalanceXGTXDai);
                $("#provideLiquidityXGT").addClass("redInput");
            } else {
                $("#provideLiquidityXGT").removeClass("redInput");
            }
            if ($("#provideLiquidityXGT").val() > 0) {
                let xdaiValue = new Big($("#provideLiquidityXGT").val()).mul(lpRatio).toString()
                if (xdaiValue > gBalanceXDai) {
                    // xdaiValue = gBalanceXDai;
                    // $("#provideLiquidityXGT").val(new Big(xdaiValue).div(lpRatio).toString())
                    $("#provideLiquidityXDai").addClass("redInput");
                } else {
                    $("#provideLiquidityXDai").removeClass("redInput");
                }
                $("#provideLiquidityXDai").val(parseFloat(xdaiValue).toFixed(2));
                $("#liquidityTotal").html(
                    "<i>$ </i>" + parseFloat(parseFloat($("#provideLiquidityXDai").val()) * 2).toFixed(0)
                );
                $("#rewards_month").val("$ " +
                    (parseFloat($("#provideLiquidityXDai").val()) / 11.3).toFixed(2)
                );
            } else {
                $("#rewards_month").val("$ 0.00");
                $("#provideLiquidityXDai").val("");
            }
            // $("#provideLiquidityXDai").trigger("input");
        });

    }
    // SWAP ELEMENT IS THERE
    if ($("#swap-select-right").length) {
        document.querySelector("#swap").addEventListener("click", swap);

        $('[id^="slippage"]').on("input", function () {
            let newVal = $(this).val();
            if (parseFloat(newVal) < 0.05) {
                newVal = 0.05
            }
            if (parseFloat(newVal) > 95) {
                newVal = 95
            }
            $('[id^="slippage"]').val(newVal);
        })

        $("#swapLeft").on("input", async function () {
            if (parseFloat($("#swapLeft").val()) < 0) {
                $("#swapLeft").val("");
                $("#swapRight").val("");
                $("#swapLeft").removeClass("redInput");
                return
            }
            await waitForCompleteLoad();
            // if ($("#swap-select-left").val() == "xgt" && parseFloat($("#swapLeft").val()) > gBalanceXGTXDai) {
            //     $("#swapLeft").val(gBalanceXGTXDai);
            // }
            // if ($("#swap-select-left").val() == "xdai" && parseFloat($("#swapLeft").val()) > gBalanceXDai) {
            //     $("#swapLeft").val(parseFloat(gBalanceXDai - 0.01).toFixed(2).toString());
            // }
            // if ($("#swap-select-left").val() == "dai" && parseFloat($("#swapLeft").val()) > gBalanceDAI) {
            //     $("#swapLeft").val(gBalanceDAI);
            // }
            if ($("#swapLeft").val() > 0) {
                await getRateFixedLeft();
            } else {
                $("#swapRight").val("");
                $("#swapLeft").removeClass("redInput");
            }
            if ($("#swap-select-left").val() == "xgt-to-mainnet" || $("#swap-select-left").val() == "xgt-to-xdai") {
                $("#swap-logo-left").html(xgtSymbol)
                $("#swap-logo-right").html(xgtSymbol)
                $("#swapRight").attr('type', 'text')
                $("#swapRight").prop("disabled", true);
                $("#swap-select-right").val("xgt");
                $("#swap-select-right").prop("disabled", true);
            } else {
                $("#swapRight").attr('type', 'number')
                $("#swapRight").prop("disabled", false);
                $("#swap-select-right").prop("disabled", false);
            }

            if ($("#swap-select-left").val() == "xgt-to-mainnet") {
                $("#swapRight").attr("placeholder", "0 XGT to Mainnet");
                $("#swapLeft").attr("placeholder", "0 XGT from xDai");
            } else if ($("#swap-select-left").val() == "xgt-to-xdai") {
                $("#swapRight").attr("placeholder", "0 XGT to xDai");
                $("#swapLeft").attr("placeholder", "0 XGT from Mainnet");
            } else {
                if ($("#swap-select-right").val() == "xgt") {
                    $("#swapRight").attr("placeholder", "0 XGT");
                } else {
                    $("#swapRight").attr("placeholder", "$ 0.00");
                }
            }

            if ($("#swap-select-left").val() == "xgt" || $("#swap-select-left").val() == "xgt-to-mainnet" || $("#swap-select-left").val() == "xgt-to-xdai") {
                if (!$("#swap-left-xgt-price").is(":visible")) {
                    $("#swap-left-xgt-price").show();
                }
                if (parseFloat($("#swapLeft").val()) > 0.1) {
                    $("#swap-left-xgt-price").html(" <i>$ </i>" + parseFloat(parseFloat($("#swapLeft").val()) * xgtPrice).toFixed(2).toString())
                } else {
                    $("#swap-left-xgt-price").html(" <i>$ </i>0.00")
                }
            } else {
                $("#swap-left-xgt-price").hide();
            }
        });
        $("#swapRight").on("input", async function () {
            if (parseFloat($("#swapRight").val()) < 0) {
                $("#swapLeft").val("");
                $("#swapRight").val("");
                $("#swapLeft").removeClass("redInput");
                return
            }
            await waitForCompleteLoad();
            if ($("#swapRight").val() > 0) {
                await getRateFixedRight();
            } else {
                $("#swapLeft").val("");
                $("#swapLeft").removeClass("redInput");
            }

            if ($("#swap-select-left").val() == "xgt") {
                if (!$("#swap-left-xgt-price").is(":visible")) {
                    $("#swap-left-xgt-price").show();
                }
                if (parseFloat($("#swapLeft").val()) > 0.1) {
                    $("#swap-left-xgt-price").html(" <i>$ </i>" + parseFloat(parseFloat($("#swapLeft").val()) * xgtPrice).toFixed(2).toString())
                } else {
                    $("#swap-left-xgt-price").html(" <i>$ </i>0.00")
                }
            } else {
                $("#swap-left-xgt-price").hide();
            }

        });

        $("#swap-select-right").change(async function () {
            await waitForCompleteLoad();
            let currVal = $("#swap-select-right").val();
            if (currVal == $("#swap-select-left").val() || ($("#swap-select-left").val() == "usd" && (currVal != "dai" && currVal != "xdai")) || (currVal == "xgt" && $("#swap-select-left").val() == "dai") || (currVal == "dai" && $("#swap-select-left").val() == "xgt")) {
                if (currVal == "xgt") {
                    $('#swap-select-left option[value="xdai"]').prop('selected', true).trigger("change");
                } else if (currVal == "xdai") {
                    $('#swap-select-left option[value="xgt"]').prop('selected', true).trigger("change");
                } else if (currVal == "dai") {
                    $('#swap-select-left option[value="usd"]').prop('selected', true).trigger("change");
                }
            }
            if ($("#swap-select-right").val() == "xgt") {
                $("#swapRight").attr("placeholder", "0 XGT");
            } else {
                $("#swapRight").attr("placeholder", "$ 0.00");
            }

            $("#swapLeft").trigger('input');
            if ($("#swap-select-right").val() == "xgt") {
                $("#swap-logo-right").html(xgtSymbol)
            } else if ($("#swap-select-right").val() == "xdai") {
                $("#swap-logo-right").html(xdaiSymbol)
            } else if ($("#swap-select-right").val() == "dai") {
                $("#swap-logo-right").html(daiSymbol)
            }
        })
        $("#swap-select-left").change(async function () {
            await waitForCompleteLoad();
            if ($("#swap-select-left").val() == "xgt-to-mainnet" || $("#swap-select-left").val() == "xgt-to-xdai") {
                $("#swapLeft").val("");
                $("#swapRight").val("");
            }
            let currVal = $("#swap-select-left").val();
            if (($("#swap-select-right").val() == currVal) || (currVal == "usd" && ($("#swap-select-right").val() != "dai" && $("#swap-select-right").val() != "xdai")) || (currVal == "dai" && $("#swap-select-right").val() == "xgt") || (currVal == "dai" && $("#swap-select-left").val() == "xgt")) {
                if (currVal == "xgt") {
                    $('#swap-select-right option[value="xdai"]').prop('selected', true).trigger("change");
                } else if (currVal == "xdai") {
                    $('#swap-select-right option[value="xgt"]').prop('selected', true).trigger("change");
                } else if (currVal == "dai") {
                    $('#swap-select-right option[value="xdai"]').prop('selected', true).trigger("change");
                } else if (currVal == "usd") {
                    $('#swap-select-right option[value="dai"]').prop('selected', true).trigger("change");
                }
            }
            if ($("#swap-select-left").val() == "usd") {
                $("#swap").html("BUY NOW")
                $("#swap").addClass("bluebuy")
            } else {
                $("#swap").html("SWAP NOW")
                $("#swap").removeClass("bluebuy")
            }
            if ($("#swap-select-left").val().indexOf("xgt") != -1) {
                $("#swapLeft").attr("placeholder", "0 XGT");
            } else {
                $("#swapLeft").attr("placeholder", "$ 0.00");
            }
            $("#swapRight").trigger('input');
            $("#swapLeft").trigger('input');
            if ($("#swap-select-left").val() == "xgt") {
                $("#swap-logo-left").html(xgtSymbol)
            } else if ($("#swap-select-left").val() == "xdai") {
                $("#swap-logo-left").html(xdaiSymbol)
            } else if ($("#swap-select-left").val() == "dai") {
                $("#swap-logo-left").html(daiSymbol)
            } else if ($("#swap-select-left").val() == "usd") {
                $("#swap-logo-left").html(usdSymbol)
            }
        })
        $("#swap-select-right").trigger("change");
        $("#swap-select-left").trigger("change");
    }

    if (window.location.href.indexOf("withdraw") > -1) {
        $("#withdraw-select").change(async function () {
            await waitForCompleteLoad();
            if ($("#withdraw-select").val() == "interest") {
                withdrawId = 1;
                $("#withdraw-input").val("0.00");
            } else if ($("#withdraw-select").val() == "farming") {
                withdrawId = 2;
                $("#withdraw-input").val("0.00");
            } else if ($("#withdraw-select").val() == "xgt") {
                withdrawId = 3;
                $("#withdraw-input").val(parseFloat(parseFloat(web3xDai.utils.fromWei(unclaimedXGT.toString()).toString()) * xgtPrice).toFixed(2));
            } else if ($("#withdraw-select").val() == "all") {
                withdrawId = 4;
                $("#withdraw-input").val(parseFloat((parseFloat(lpValue) + parseFloat(stakeValue))).toFixed(2));
            }
        })
        $("#withdraw-select").trigger('change');

        $("#withdraw-input").on("input", async function () {
            await waitForCompleteLoad();
            if (withdrawId == 1 && parseFloat($("#withdraw-input").val()) > parseFloat(stakeValue.toString())) {
                $("#withdraw-input").val(parseFloat(stakeValue).toFixed(2));
            }
            if (withdrawId == 2 && parseFloat($("#withdraw-input").val()) > parseFloat(lpValue.toString())) {
                $("#withdraw-input").val(parseFloat(lpValue).toFixed(2));
            }
            if (withdrawId == 3) {
                $("#withdraw-input").val(parseFloat(parseFloat(web3xDai.utils.fromWei(unclaimedXGT.toString()).toString()) * xgtPrice).toFixed(2));
            }
            if (withdrawId == 4) {
                $("#withdraw-input").val(parseFloat((parseFloat(lpValue) + parseFloat(stakeValue))).toFixed(2));
            }
        });

        $("#withdrawMax").on("click", async function () {
            await waitForCompleteLoad();
            if (withdrawId == 1) {
                $("#withdraw-input").val(parseFloat(stakeValue).toFixed(2));
            } else if (withdrawId == 2) {
                $("#withdraw-input").val(parseFloat(lpValue).toFixed(2));
            }
        })
    }

    // if (window.location.href.indexOf("faq") > -1) {
    //     $(".select-selected").first().bind("DOMSubtreeModified", function () {
    //         if ($(".select-selected").first().text().length > 0) {
    //             if ($(".select-selected").first().text() == "United States") {
    //                 $(".select-selected").children().eq(1).text("USD (US Dollar)");
    //                 $('[id^="payout-"]').show();
    //                 $("#payout-clabe").hide();
    //                 $("#payout-swift").hide();
    //                 $("#payout-bankname-br").hide();
    //                 $("#payout-bankname-cn").hide();
    //                 $("#payout-bsb").hide();
    //                 $("#payout-fullname").hide();
    //                 $("#payout-bankname").hide();
    //                 $("#payout-branchname").hide();
    //                 $("#payout-bankcity").hide();
    //                 $("#payout-bankprovince").hide();
    //                 $("#payout-chineseid").hide();
    //                 $("#payout-brazilid").hide();
    //                 $("#payout-branchcode").hide();
    //             } else if ($(".select-selected").first().text() == "EU") {
    //                 $('[id^="payout-"]').show();
    //                 $(".select-selected").eq(1).text("EUR (Euro)");
    //                 $("#payout-clabe").hide();
    //                 $("#payout-achrouting").hide();
    //                 $("#payout-state").hide();
    //                 $("#payout-dob").hide();
    //                 $("#payout-bsb").hide();
    //                 $("#payout-bankname-br").hide();
    //                 $("#payout-bankname-cn").hide();
    //                 $("#payout-fullname").hide();
    //                 $("#payout-bankname").hide();
    //                 $("#payout-branchname").hide();
    //                 $("#payout-bankcity").hide();
    //                 $("#payout-bankprovince").hide();
    //                 $("#payout-chineseid").hide();
    //                 $("#payout-accounttype").hide();
    //                 $("#payout-branchcode").hide();
    //                 $("#payout-brazilid").hide();
    //             } else if ($(".select-selected").first().text() == "Australia") {
    //                 $('[id^="payout-"]').show();
    //                 $(".select-selected").eq(1).text("AUD (Australian Dollar)");
    //                 $("#payout-clabe").hide();
    //                 $("#payout-achrouting").hide();
    //                 $("#payout-swift").hide();
    //                 $("#payout-state").hide();
    //                 $("#payout-dob").hide();
    //                 $("#payout-fullname").hide();
    //                 $("#payout-bankname-br").hide();
    //                 $("#payout-bankname-cn").hide();
    //                 $("#payout-bankname").hide();
    //                 $("#payout-branchname").hide();
    //                 $("#payout-bankcity").hide();
    //                 $("#payout-bankprovince").hide();
    //                 $("#payout-chineseid").hide();
    //                 $("#payout-branchcode").hide();
    //                 $("#payout-brazilid").hide();
    //             } else if ($(".select-selected").first().text() == "China") {
    //                 $('[id^="payout-"]').show();
    //                 $(".select-selected").eq(1).text("CNY (Chinese Yuan)");
    //                 $("#payout-clabe").hide();
    //                 $("#payout-achrouting").hide();
    //                 $("#payout-bankname-br").hide();
    //                 $("#payout-swift").hide();
    //                 $("#payout-state").hide();
    //                 $("#payout-bsb").hide();
    //                 $("#payout-dob").hide();
    //                 $("#payout-firstname").hide();
    //                 $("#payout-lastname").hide();
    //                 $("#payout-address1").hide();
    //                 $("#payout-address2").hide();
    //                 $("#payout-city").hide();
    //                 $("#payout-zip").hide();
    //                 $("#payout-state").hide();
    //                 $("#payout-accounttype").hide();
    //                 $("#payout-mobile").hide();
    //                 $("#payout-branchcode").hide();
    //                 $("#payout-brazilid").hide();
    //             } else if ($(".select-selected").first().text() == "Brazil") {
    //                 $('[id^="payout-"]').show();
    //                 $(".select-selected").eq(1).text("BRL (Brazilian Real)");
    //                 $("#payout-clabe").hide();
    //                 $("#payout-bankname-cn").hide();
    //                 $("#payout-achrouting").hide();
    //                 $("#payout-swift").hide();
    //                 $("#payout-state").hide();
    //                 $("#payout-dob").hide();
    //                 $("#payout-firstname").hide();
    //                 $("#payout-bsb").hide();
    //                 $("#payout-lastname").hide();
    //                 $("#payout-branchname").hide();
    //                 $("#payout-bankcity").hide();
    //                 $("#payout-bankprovince").hide();
    //                 $("#payout-chineseid").hide();
    //                 $("#payout-lastname").hide();
    //                 $("#payout-address1").hide();
    //                 $("#payout-address2").hide();
    //                 $("#payout-city").hide();
    //                 $("#payout-zip").hide();
    //                 $("#payout-state").hide();
    //             } else if ($(".select-selected").first().text() == "Mexico") {
    //                 $('[id^="payout-"]').show();
    //                 $(".select-selected").eq(1).text("MXN (Mexican Peso)");
    //                 $("#payout-achrouting").hide();
    //                 $("#payout-swift").hide();
    //                 $("#payout-bankname-br").hide();
    //                 $("#payout-bankname-cn").hide();
    //                 $("#payout-state").hide();
    //                 $("#payout-dob").hide();
    //                 $("#payout-bankname").hide();
    //                 $("#payout-branchcode").hide();
    //                 $("#payout-bsb").hide();
    //                 $("#payout-branchname").hide();
    //                 $("#payout-bankcity").hide();
    //                 $("#payout-bankprovince").hide();
    //                 $("#payout-chineseid").hide();
    //                 $("#payout-address1").hide();
    //                 $("#payout-mobile").hide();
    //                 $("#payout-address2").hide();
    //                 $("#payout-city").hide();
    //                 $("#payout-zip").hide();
    //                 $("#payout-state").hide();
    //                 $("#payout-accounttype").hide();
    //                 $("#payout-brazilid").hide();
    //             }
    //         }
    //     })
    //     $(".select-selected").first().text("United States");

    // const url = "https://dev.binbash.sh/api/sendwyre/withdraw/eu";
    // const data = {
    //     "country": "US",
    //     "currency": "USD",
    //     "firstNameOnAccount": "John",
    //     "lastNameOnAccount": "Doe",
    //     "beneficiaryAddress": "123 Main St",
    //     "beneficiaryAddress2": "",
    //     "beneficiaryCity": "Anytown",
    //     "beneficiaryPostal": "17101",
    //     "beneficiaryPhoneNumber": "0123456789",
    //     "beneficaryState": "CA",
    //     "beneficiaryDobDay": "1",
    //     "beneficiaryDobMonth": "1",
    //     "beneficiaryDobYear": "1969",
    //     "accountNumber": "1234567890123",
    //     "routingNumber": "123412312",
    //     "accountType": "CHECKING"
    // };
    // const other_params = {
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: JSON.stringify(data),
    //     method: "POST",
    // };
    // fetch(url, other_params).then(response => response.json()).then(json => console.log(json))
    // fetch(url, other_params)
    //     .then(function (response) {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error("Could not reach the API: " + response.statusText);
    //         }
    //     })
    // }

    if ($("#wait-joke").length) {
        let jokes = ["How many miners does it take to change a light bulb?", "What kind of car will you never see a Bitcoiner driving?", "What is an assassin’s favorite cryptocurrency payment method?", "What do cryptocurrency investors do for fun?", "What’s the difference between Bitcoin and NASA?", "Why won’t the government embrace Bitcoin?", "Why do Bitcoin cryptologists drive recklessly?", "Where does an Eskimo keep his Bitcoins?", "What’s the difference between a bitcoin miner and an average plumber?", "Why do Bitcoiners want Lambo?"];

        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        $("#wait-joke").html(randomJoke)
    }

    if (!$("#tvl").length) {
        setTimeout(loadTawk, 50);
    }
});

async function XGTtoMainnet() {
    if ($("#swapLeft").val() == "" || $("#swapRight").val() == "") {
        return
    }
    if ($("#swapLeft").hasClass("redInput")) {
        $("#error-popup-money-swap").addClass("popup_open")
        return
    }
    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let networkOk = await waitForSwitch(xdaiId, "swap");
    if (!networkOk) {
        return
    }
    let xgtAmount = web3.utils.toWei($("#swapLeft").val(), "ether");
    try {
        await xgtContract.methods.transferToMainnet(xgtAmount).send({
            from: selectedAccount,
            gasPrice: "1000000000"
        })
    } catch (e) {
        console.log(e)
    }
}

function loadTawk() {
    var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/6012a5c8c31c9117cb736787/1et4df6fd';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
}

async function showTorusLoader() {
    $(".preloader").show();
    while (typeof $("#torusIframe")[0] == "undefined" || $("#torusIframe")[0].style.display != "block") {
        await sleep(100);
    }
    await sleep(500);
    $(".preloader").hide();
}

var validate = function (e) {
    var t = e.value;
    e.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
}

async function waitForCompleteLoad() {
    if (!VALUES_LOADED) {
        while (!VALUES_LOADED) {
            await sleep(100);
        }
        console.log("Loading done.")
        $(".preloader").hide();
    }
}