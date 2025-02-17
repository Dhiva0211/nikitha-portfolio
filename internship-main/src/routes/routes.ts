const routes = {
  login: '/login',
  vendor: {
    dashboard: '/vendor',
    newRegister: {
      default: '/vendor/new-register',
      welcome: '/vendor/new-register/welcome',
    },
    login: '/vendor/login',
    tenOfferings: {
      default: '/vendor/ten-offerings',
      objMachPack: {
        default: '/vendor/ten-offerings/objects-machines-packaging',
        deleteOffering:
          '/vendor/ten-offerings/objects-machines-packaging/delete-offering',
        deleteOfferingSuccess:
          '/vendor/ten-offerings/objects-machines-packaging/delete-offering/success',
        ApprovalOffering:
          '/vendor/ten-offerings/objects-machines-packaging/approval-offering',
      },
      generalSolutions: {
        individualServices: {
          default:
            '/vendor/ten-offerings/general-solutions/individual-services',
          deleteOffering:
            '/vendor/ten-offerings/general-solutions/individual-services/delete-offering',
          deleteOfferingSuccess:
            '/vendor/ten-offerings/general-solutions/individual-services/delete-offering/success',
          ApprovalOffering:
            '/vendor/ten-offerings/general-solutions/individual-services/approval-offering',
        },
        subscription: {
          default: '/vendor/ten-offerings/general-solutions/subscription',
          deleteOffering:
            '/vendor/ten-offerings/general-solutions/subscription/delete-offering',
          deleteOfferingSuccess:
            '/vendor/ten-offerings/general-solutions/subscription/delete-offering/success',
          ApprovalOffering:
            '/vendor/ten-offerings/general-solutions/subscription/approval-offering',
        },
      },
      licenseNft: {
        default: '/vendor/ten-offerings/license-nft',
        nft: {
          default: '/vendor/ten-offerings/license-nft/nft',
          deleteOffering:
            '/vendor/ten-offerings/license-nft/nft/delete-offering',
          deleteOfferingSuccess:
            '/vendor/ten-offerings/license-nft/nft/delete-offering/success',
          ApprovalOffering:
            '/vendor/ten-offerings/license-nft/nft/approval-offering',
        },
        artwork: {
          default: '/vendor/ten-offerings/license-nft/artwork',
          deleteOffering:
            '/vendor/ten-offerings/license-nft/artwork/delete-offering',
          deleteOfferingSuccess:
            '/vendor/ten-offerings/license-nft/artwork/delete-offering/success',
          ApprovalOffering:
            '/vendor/ten-offerings/license-nft/artwork/approval-offering',
        },
      },
    },
    inputOfferings: {
      default: '/vendor/input-offerings',
      objMachPack: {
        default: '/vendor/input-offerings/objects-machines-packaging',
        setUpPrice: {
          default:
            '/vendor/input-offerings/objects-machines-packaging/set-up-price',
          salesTaxesOptions:
            '/vendor/input-offerings/objects-machines-packaging/set-up-price/sales-taxes-options',
        },
        setUpTechOfCustom: {
          default:
            '/vendor/input-offerings/objects-machines-packaging/set-up-tech-of-custom',
        },
        newSeason: {
          default:
            '/vendor/input-offerings/objects-machines-packaging/new-season',
          submit:
            '/vendor/input-offerings/objects-machines-packaging/new-season/submit',
        },
        setUpBasicOfferingFeatures: {
          default:
            '/vendor/input-offerings/objects-machines-packaging/set-up-basic-offering-features',
          size: '/vendor/input-offerings/objects-machines-packaging/set-up-basic-offering-features/size',
          color:
            '/vendor/input-offerings/objects-machines-packaging/set-up-basic-offering-features/color',
          material:
            '/vendor/input-offerings/objects-machines-packaging/set-up-basic-offering-features/material',
          weight:
            '/vendor/input-offerings/objects-machines-packaging/set-up-basic-offering-features/weight',
        },
        setUpOfferingDescription: {
          default:
            '/vendor/input-offerings/objects-machines-packaging/set-up-offering-description',
        },
        setUpCustomizationSizeTable: {
          default:
            '/vendor/input-offerings/objects-machines-packaging/set-up-customization-size-table',
        },
      },
      generalSolutions: {
        individualServices: {
          default:
            '/vendor/input-offerings/general-solutions/individual-services',
          setUpPrice: {
            default:
              '/vendor/input-offerings/general-solutions/individual-services/set-up-price',
            salesTaxesOptions:
              '/vendor/input-offerings/general-solutions/individual-services/set-up-price/sales-taxes-options',
          },
          messages: {
            default:
              '/vendor/input-offerings/general-solutions/individual-services/messages',
          },
          newSeason: {
            default:
              '/vendor/input-offerings/general-solutions/individual-services/new-season',
            submit:
              '/vendor/input-offerings/general-solutions/individual-services/new-season/submit',
          },
          setUpSolutionsFeatures: {
            default:
              '/vendor/input-offerings/general-solutions/individual-services/set-up-solutions-features',
            single:
              '/vendor/input-offerings/general-solutions/individual-services/set-up-solutions-features/single',
            threeTiers:
              '/vendor/input-offerings/general-solutions/individual-services/set-up-solutions-features/three-tiers',
          },
          setUpSolutionDescription: {
            default:
              '/vendor/input-offerings/general-solutions/individual-services/set-up-solution-description',
          },
          setUpStepsToPurchase: {
            default:
              '/vendor/input-offerings/general-solutions/individual-services/set-up-steps-to-purchase',
          },
        },
        subscription: {
          default: '/vendor/input-offerings/general-solutions/subscription',
          setUpPrice: {
            default:
              '/vendor/input-offerings/general-solutions/subscription/set-up-price',
            salesTaxesOptions:
              '/vendor/input-offerings/general-solutions/subscription/set-up-price/sales-taxes-options',
          },
          messages: {
            default:
              '/vendor/input-offerings/general-solutions/subscription/messages',
          },
          expectedUpdates:
            '/vendor/input-offerings/general-solutions/subscription/expected-updates',
          setUpPlanFeatures: {
            default:
              '/vendor/input-offerings/general-solutions/subscription/set-up-plan-features',
          },
          setUpSolutionDescription: {
            default:
              '/vendor/input-offerings/general-solutions/subscription/set-up-solution-description',
          },
          setUpStepsToPurchase: {
            default:
              '/vendor/input-offerings/general-solutions/subscription/set-up-steps-to-purchase',
          },
        },
      },
      licenseNft: {
        nft: {
          default: '/vendor/input-offerings/license-nft/nft',
          setUpPrice: {
            default: '/vendor/input-offerings/license-nft/nft/set-up-price',
            salesTaxesOptions:
              '/vendor/input-offerings/license-nft/nft/set-up-price/sales-taxes-options',
          },
          setUpLicenseType: {
            default:
              '/vendor/input-offerings/license-nft/nft/set-up-license-type',
          },
          setUpNftDescription: {
            default:
              '/vendor/input-offerings/license-nft/nft/set-up-nft-description',
          },
          newSeason: {
            default: '/vendor/input-offerings/license-nft/nft/new-season',
            submit: '/vendor/input-offerings/license-nft/nft/new-season/submit',
          },
          setUpNftLicensingPeriod: {
            default:
              '/vendor/input-offerings/license-nft/nft/set-up-nft-licensing-period',
          },
          setUpPreviousLicenseAgreements: {
            default:
              '/vendor/input-offerings/license-nft/nft/set-up-previous-license-agreements',
          },
          setUpNftLicenseDate: {
            default:
              '/vendor/input-offerings/license-nft/nft/set-up-nft-license-date',
          },
        },
        artwork: {
          default: '/vendor/input-offerings/license-nft/artwork',
          setUpPrice: {
            default: '/vendor/input-offerings/license-nft/artwork/set-up-price',
            salesTaxesOptions:
              '/vendor/input-offerings/license-nft/artwork/set-up-price/sales-taxes-options',
          },
          setUpLicenseType: {
            default:
              '/vendor/input-offerings/license-nft/artwork/set-up-license-type',
          },
          setUpArtworkDescription: {
            default:
              '/vendor/input-offerings/license-nft/artwork/set-up-artwork-description',
          },
          newSeason: {
            default: '/vendor/input-offerings/license-nft/artwork/new-season',
            submit:
              '/vendor/input-offerings/license-nft/artwork/new-season/submit',
          },
          setUpArtworkLicensingPeriod: {
            default:
              '/vendor/input-offerings/license-nft/artwork/set-up-artwork-licensing-period',
          },
          setUpPreviousLicenseAgreements: {
            default:
              '/vendor/input-offerings/license-nft/artwork/set-up-previous-license-agreements',
          },
          setUpArtworkLicenseDate: {
            default:
              '/vendor/input-offerings/license-nft/artwork/set-up-artwork-license-date',
          },
        },
      },
    },
    orderSetup: {
      default: '/vendor/order-setup',
      objMachPack: {
        default: '/vendor/order-setup/objects-machines-packaging',
        setUp: {
          default: '/vendor/order-setup/objects-machines-packaging/set-up',
          BasicOfferingStock:
            '/vendor/order-setup/objects-machines-packaging/set-up/basic-offering-stock',
        },
        trackingNumber:
          '/vendor/order-setup/objects-machines-packaging/tracking-number',
        shippingDestinations:
          '/vendor/order-setup/objects-machines-packaging/shipping-destinations',
      },
      generalSolutions: {
        individualServices: {
          default: '/vendor/order-setup/general-solutions/individual-services',
          trackingNumber:
            '/vendor/order-setup/general-solutions/individual-services/tracking-number',
          shippingDestination:
            '/vendor/order-setup/general-solutions/individual-services/shipping-destinations',
          softwareSolution:
            '/vendor/order-setup/general-solutions/individual-services/software-solution',
          deliveryMethod:
            '/vendor/order-setup/general-solutions/individual-services/delivery-method',
        },
        subscription: {
          default: '/vendor/order-setup/general-solutions/subscription',
          trackingNumber:
            '/vendor/order-setup/general-solutions/subscription/tracking-number',
          shippingDestination:
            '/vendor/order-setup/general-solutions/subscription/shipping-destinations',
          deliveryMethod:
            '/vendor/order-setup/general-solutions/subscription/delivery-method',
        },
      },
      licenseNft: {
        artwork: {
          default: '/vendor/order-setup/license-nft/artwork',
          trackingNumber:
            '/vendor/order-setup/license-nft/artwork/tracking-number',
          shippingDestination:
            '/vendor/order-setup/license-nft/artwork/shipping-destinations',
        },
        nft: {
          default: '/vendor/order-setup/license-nft/nft',
          trackingNumber: '/vendor/order-setup/license-nft/nft/tracking-number',
          shippingDestination:
            '/vendor/order-setup/license-nft/nft/shipping-destinations',
        },
      },
    },
    orderFollowUp: {
      default: '/vendor/order-follow-up',
      objectsMachinesPackaging: {
        default: '/vendor/order-follow-up/objects-machines-packaging',
        followUp:
          '/vendor/order-follow-up/objects-machines-packaging/follow-up',
      },
      individualSolutions: {
        default: '/vendor/order-follow-up/individual-solutions',
        followUp: '/vendor/order-follow-up/individual-solutions/follow-up',
      },
      subscription: {
        default: '/vendor/order-follow-up/subscription',
        followUp: '/vendor/order-follow-up/subscription/follow-up',
      },
      licenseNft: '/vendor/order-follow-up/license-nft',
    },
    manageReturns: {
      default: '/vendor/manage-returns',
      objectsMachinesPackaging: {
        default: '/vendor/manage-returns/objects-machines-packaging',
        complain: '/vendor/manage-returns/objects-machines-packaging/complain',
      },
      individualSolutionsSubscription: {
        default: '/vendor/manage-returns/individual-solutions-subscription',
        complain:
          '/vendor/manage-returns/individual-solutions-subscription/complain',
      },
      licenseNft: {
        default: '/vendor/manage-returns/license-nft',
        complain: '/vendor/manage-returns/license-nft/complain',
      },
    },
    logisticsAndApis: {
      default: '/vendor/logistics-and-apis',
      objectsMachinesPackaging: {
        default: '/vendor/logistics-and-apis/objects-machines-packaging',
        inputPackageChoices:
          '/vendor/logistics-and-apis/objects-machines-packaging/input-package-choices',
        inputPreferredShippingPlan: {
          default:
            '/vendor/logistics-and-apis/objects-machines-packaging/input-preferred-shipping-plan',
          manualInputShippingRateEstimated:
            '/vendor/logistics-and-apis/objects-machines-packaging/input-preferred-shipping-plan/manual-input-shipping-rate-estimated',
          orderInsurances:
            '/vendor/logistics-and-apis/objects-machines-packaging/input-preferred-shipping-plan/order-insurances',
        },
        printShippingLabels:
          '/vendor/logistics-and-apis/objects-machines-packaging/print-shipping-labels',
      },
      generalSolutions: {
        individualServices: {
          default:
            '/vendor/logistics-and-apis/general-solutions/individual-services',
          setUpPhysicalDeliveryOfYourService: {
            default:
              '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-physical-delivery-of-your-service',
            inputPackageChoices:
              '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-physical-delivery-of-your-service/input-package-choices',
            inputPreferredShippingPlan: {
              default:
                '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-physical-delivery-of-your-service/input-preferred-shipping-plan',
              manualInputShippingRateEstimated:
                '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-physical-delivery-of-your-service/input-preferred-shipping-plan/manual-input-shipping-rate-estimated',
              orderInsurances:
                '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-physical-delivery-of-your-service/input-preferred-shipping-plan/order-insurances',
            },
            printShippingLabels:
              '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-physical-delivery-of-your-service/print-shipping-labels',
          },
          setUpDigitalDeliveryOfYourService: {
            default:
              '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-digital-delivery-of-your-service',
            inputPreferredShippingPlan: {
              default:
                '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-digital-delivery-of-your-service/input-preferred-shipping-plan',
              orderInsurances:
                '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-digital-delivery-of-your-service/input-preferred-shipping-plan/order-insurances',
            },
          },
          setUpApiProcess: {
            default:
              '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-api-process',
            continue:
              '/vendor/logistics-and-apis/general-solutions/individual-services/set-up-api-process/continue',
          },
        },
        subscription: {
          default: '/vendor/logistics-and-apis/general-solutions/subscription',
          continue:
            '/vendor/logistics-and-apis/general-solutions/subscription/continue',
        },
      },
      licenseNft: {
        artwork: '/vendor/logistics-and-apis/license-nft/artwork',
        nonMintedNft: {
          default: '/vendor/logistics-and-apis/license-nft/non-minted-nft',
          continue:
            '/vendor/logistics-and-apis/license-nft/non-minted-/continue',
        },
        nft: {
          default: '/vendor/logistics-and-apis/license-nft/nft',
        },
      },
    },
    support: '/vendor/support',
    editWindowDecor: {
      default: '/vendor/edit-window-decor',
      success: '/vendor/edit-window-decor/success',
    },
    payment: {
      default: '/vendor/payment',
      detailFiatPayment: '/vendor/payment/detail-fiat-payment',
      detailCryptoPayment: '/vendor/payment/detail-crypto-payment',
      editPaymentGateways: '/vendor/payment/edit-payment-gateways',
      editFiatPayment: '/vendor/payment/edit-fiat-payment',
      editCryptoWallet: '/vendor/payment/edit-crypto-wallet',
      editSellingCurrency: '/vendor/payment/edit-selling-currency',
    },
    buyAdAttacks: {
      default: '/vendor/buy-ad-attacks',
    },
    statistics: '/vendor/statistics',
    accounts: {
      default: '/vendor/accounts',
      balanceSheetIncomeStatementCashFlow: {
        default: '/vendor/accounts/balance-sheet-income-statement-cash-flow',
        manualInput:
          '/vendor/accounts/balance-sheet-income-statement-cash-flow/manual-input',
      },
      incomeStatement: {
        default: '/vendor/accounts/income-statement',
        manualInput: '/vendor/accounts/income-statement/manual-input',
      },
      cashFlow: {
        default: '/vendor/accounts/cash-flow',
        manualInput: '/vendor/accounts/cash-flow/manual-input',
      },
      cashAccount: {
        default: '/vendor/accounts/cash-account',
        manualInput: '/vendor/accounts/cash-account/manual-input',
      },
      salesAccount: {
        default: '/vendor/accounts/sales-account',
        manualInput: '/vendor/accounts/sales-account/manual-input',
      },
      inventoryAccount: {
        default: '/vendor/accounts/inventory-account',
        manualInput: '/vendor/accounts/inventory-account/manual-input',
      },
      ordersReturnsRefunds: {
        default: '/vendor/accounts/orders-returns-refunds',
        ordersList: '/vendor/accounts/orders-returns-refunds/orders-list',
        returnsList: '/vendor/accounts/orders-returns-refunds/returns-list',
        refundsList: '/vendor/accounts/orders-returns-refunds/refunds-list',
        shoppittosList:
          '/vendor/accounts/orders-returns-refunds/shoppittos-list',
        invoicesList: '/vendor/accounts/orders-returns-refunds/invoices-list',
        receiptsList: '/vendor/accounts/orders-returns-refunds/receipts-list',
      },
      document1099K: '/vendor/accounts/1099-k',
      incomeEstimateSales: '/vendor/accounts/income-estimate-sales',
      salesRelatedTax: '/vendor/accounts/sales-related-tax',
    },
    setUpEditVendorWindow: {
      default: '/vendor/set-up-edit-vendor-window',
      step1: '/vendor/set-up-edit-vendor-window/step-1',
      step2: '/vendor/set-up-edit-vendor-window/step-2',
      step3: '/vendor/set-up-edit-vendor-window/step-3',
      step4: '/vendor/set-up-edit-vendor-window/step-4',
      step5: '/vendor/set-up-edit-vendor-window/step-5',
      step6: '/vendor/set-up-edit-vendor-window/step-6',
      step7: '/vendor/set-up-edit-vendor-window/step-7',
    },
  },
  returnBack: '/return-back',
  underConstruction: '/under-construction',
  home: '/',
} as const;

export default routes;
