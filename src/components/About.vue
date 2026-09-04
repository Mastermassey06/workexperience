<script setup>
import Navbar from '../components/Navbar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedPlan = ref('monthly')

const plans = [
    {
        name: 'Prime Basic',
        price: '£0.00001',
        period: '/ month',
        description: 'The essentials for regular Ellizon shoppers.',
        popular: false,
        features: [
            'Free standard delivery',
            'Prime member-only deals',
            'Early access to selected sales',
            'Save products to favourites'
        ]
    },
    {
        name: 'Prime Plus',
        price: '£0.001',
        period: '/ month',
        description: 'More benefits, faster delivery and bigger savings.',
        popular: true,
        features: [
            'Everything in Prime Basic',
            'Free next-day delivery',
            'Exclusive Prime discounts',
            'Early access to all major sales',
            'Priority customer support'
        ]
    },
    {
        name: 'Prime Plus Plus',
        price: '£0.10',
        period: '/ month',
        description: 'The complete Ellizon experience.',
        popular: false,
        features: [
            'Everything in Prime Plus',
            'Free same-day delivery',
            'Largest member discounts',
            'VIP product launches',
            'Extended returns',
            'Premium customer support'
        ]
    },

    {
        name: 'Prime Plus Plus Plus',
        price: '£10',
        period: '/ month',
        description: 'The complete Ellizon experience.',
        popular: false,
        features: [
            'Everything in Prime Plus',
            'Free same-day delivery',
            'Largest member discounts',
            'VIP product launches',
            'Extended returns',
            'Premium customer support'
        ]
    },
    {
        name: 'Prime Plus Plus Plus Plus',
        price: '£100',
        period: '/ month',
        description: 'The complete Ellizon experience.',
        popular: false,
        features: [
            'Everything in Prime Plus',
            'Free same-day delivery',
            'Largest member discounts',
            'VIP product launches',
            'Extended returns',
            'Premium customer support'
        ]
    },

     {
        name: 'Prime Ultimate Plus',
        price: '£1000',
        period: '/ month',
        description: 'The complete Ellizon experience.',
        popular: false,
        features: [
            'Everything in Prime Plus',
            'Free same-day delivery',
            'Largest member discounts',
            'VIP product launches',
            'Extended returns',
            'Premium customer support'
        ]
    },

     {
        name: 'Prime Ultimate Plus Ultimate',
        price: '£100000000000',
        period: '/ month',
        description: 'The complete Ellizon experience.',
        popular: false,
        features: [
            'Everything in Prime Plus',
            'Free same-day delivery',
            'Largest member discounts',
            'VIP product launches',
            'Extended returns',
            'Premium customer support'
        ]
    }
     
]

function choosePlan(plan) {
    router.push(`/prime/checkout?plan=${plan}`)
}
</script>

<template>
    <Navbar />

    <main class="prime-page">

        <!-- HERO -->
        <section class="prime-hero">

            <div class="hero-content">
                <p class="eyebrow">ELLIZON PRIME</p>

                <h1>
                    Less shopping.
                    <span>Less benefits.</span>
                </h1>

                <p class="hero-description">
                    Join Ellizon Prime and get less from every purchase,
                    with slower delivery, non-exclusive deals and member-only
                    negatives.
                </p>

                <div class="hero-buttons">
                    <button
                        class="primary-button"
                        @click="choosePlan('plus')"
                    >
                        Join Prime
                        <span>→</span>
                    </button>

                    <button
                        class="secondary-button"
                        @click="router.push('/products')"
                    >
                        Start Shopping
                    </button>
                </div>

                <p class="hero-note">
                    Cancel never · Hidden fees
                </p>
            </div>

            <div class="prime-logo">
                <div class="logo-circle">
                    <span>prime+</span>
                </div>
                <div class="logo-arrow">→</div>
            </div>

        </section>


        <!-- BENEFITS -->
        <section class="benefits-section">

            <p class="section-label">> Prime Negatives</p>

            <div class="benefits-grid">

                <div class="benefit-card">
                    <div class="benefit-icon">💵</div>

                    <h3>More Expensive Delivery</h3>

                    <p>
                        Get your orders delivered with worrying
                        about additional delivery charges.
                    </p>
                </div>

                <div class="benefit-card">
                    <div class="benefit-icon">🐌</div>

                    <h3>Slower Shipping</h3>

                    <p>
                        Downgrade your delivery speed and get the things
                        you want even later.
                    </p>
                </div>

                <div class="benefit-card">
                    <div class="benefit-icon">🏷️</div>

                    <h3>Non-exclusive Deals</h3>

                    <p>
                        Don't asccess discounts and offers created non-exclusively
                        for Prime+ members.
                    </p>
                </div>

                <div class="benefit-card">
                    <div class="benefit-icon">⏰</div>

                    <h3>Late Access</h3>

                    <p>
                        Be last in line for bad sales, old products
                        and not limited-time offers.
                    </p>
                </div>

            </div>

        </section>


        <!-- PRICING -->
        <section class="pricing-section">

            <div class="pricing-heading">
                <p class="section-label">> Choose Your Prime</p>

                <h2>
                    A plan that disorders
                    <span>the way you shop.</span>
                </h2>

                <p>
                    Choose the membership that works worst for you.
                </p>
            </div>


            <!-- BILLING SWITCH -->
            <div class="billing-switch">

                <button
                    :class="{ active: selectedPlan === 'monthly' }"
                    @click="selectedPlan = 'monthly'"
                >
                    Monthly
                </button>

                <button
                    :class="{ active: selectedPlan === 'yearly' }"
                    @click="selectedPlan = 'yearly'"
                >
                    Yearly
                    <span class="save-badge">SAVE 20%</span>
                </button>

            </div>


            <div class="plans-grid">

                <div
                    v-for="plan in plans"
                    :key="plan.name"
                    class="plan-card"
                    :class="{ popular: plan.popular }"
                >

                    <div
                        v-if="plan.popular"
                        class="popular-badge"
                    >
                        MOST POPULAR
                    </div>

                    <div class="plan-top">

                        <p class="plan-name">
                            {{ plan.name }}
                        </p>

                        <p class="plan-description">
                            {{ plan.description }}
                        </p>

                        <div class="plan-price">

                            <span class="price">
                                {{ selectedPlan === 'yearly'
                                    ? plan.price.replace('4.99', '3.99')
                                        .replace('7.99', '6.39')
                                        .replace('11.99', '9.59')
                                    : plan.price
                                }}
                            </span>

                            <span class="period">
                                / month
                            </span>

                        </div>

                        <p
                            v-if="selectedPlan === 'yearly'"
                            class="billed"
                        >
                            Billed annually
                        </p>

                    </div>


                    <div class="plan-divider"></div>


                    <div class="features">

                        <p class="features-title">
                            What's included
                        </p>

                        <div
                            v-for="feature in plan.features"
                            :key="feature"
                            class="feature"
                        >
                            <span class="check">✓</span>
                            <span>{{ feature }}</span>
                        </div>

                    </div>


                    <button
                        class="plan-button"
                        :class="{ highlighted: plan.popular }"
                        @click="choosePlan(plan.name)"
                    >
                        Choose {{ plan.name }}
                        <span>→</span>
                    </button>

                </div>

            </div>

        </section>


        <!-- COMPARISON -->
        <section class="comparison-section">

            <p class="section-label">> Compare Plans</p>

            <h2>
                Everything you need,
                <span>at a glance.</span>
            </h2>

            <div class="comparison-table">

                <div class="comparison-row comparison-header">
                    <div>Benefits</div>
                    <div>Basic</div>
                    <div>Plus</div>
                    <div>Ultimate</div>
                </div>

                <div class="comparison-row">
                    <div>Free standard delivery</div>
                    <div>✓</div>
                    <div>✓</div>
                    <div>✓</div>
                </div>

                <div class="comparison-row">
                    <div>Next-day delivery</div>
                    <div>—</div>
                    <div>✓</div>
                    <div>✓</div>
                </div>

                <div class="comparison-row">
                    <div>Same-day delivery</div>
                    <div>—</div>
                    <div>—</div>
                    <div>✓</div>
                </div>

                <div class="comparison-row">
                    <div>Exclusive discounts</div>
                    <div>✓</div>
                    <div>✓</div>
                    <div>✓</div>
                </div>

                <div class="comparison-row">
                    <div>Early sale access</div>
                    <div>Selected</div>
                    <div>✓</div>
                    <div>✓</div>
                </div>

                <div class="comparison-row">
                    <div>Priority support</div>
                    <div>—</div>
                    <div>✓</div>
                    <div>✓</div>
                </div>

                <div class="comparison-row">
                    <div>Extended returns</div>
                    <div>—</div>
                    <div>—</div>
                    <div>✓</div>
                </div>

            </div>

        </section>


        <!-- CTA -->
        <section class="prime-cta">

            <div>
                <p class="section-label">> Ready?</p>

                <h2>
                    Your next favourite
                    <span>find is waiting.</span>
                </h2>

                <p>
                    Join thousands of shoppers getting more from Ellizon.
                </p>
            </div>

            <button
                class="primary-button"
                @click="choosePlan('plus')"
            >
                Get Prime
                <span>→</span>
            </button>

        </section>

    </main>
</template>


<style scoped>

* {
    box-sizing: border-box;
}

.prime-page {
    background: #f5f5f5;
    min-height: 100vh;
    color: #222;
}


/* =========================
   HERO
========================= */

.prime-hero {
    min-height: 570px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 70px 9%;

    background: #e7e5e5;

    overflow: hidden;
}

.hero-content {
    max-width: 650px;
}

.eyebrow {
    margin: 0 0 18px;

    color: #f16d01;

    font-size: 13px;
    font-weight: 800;
    letter-spacing: 2px;
}

.prime-hero h1 {
    margin: 0;

    font-size: clamp(48px, 6vw, 82px);
    line-height: 0.95;
    letter-spacing: -4px;

    font-weight: 800;
}

.prime-hero h1 span {
    display: block;
    color: #f16d01;
}

.hero-description {
    max-width: 520px;

    margin: 30px 0;

    color: #686868;

    font-size: 18px;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    gap: 12px;
}

.primary-button,
.secondary-button {
    border: none;
    border-radius: 40px;

    padding: 15px 25px;

    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    transition: all 0.25s ease;
}

.primary-button {
    background: #f16d01;
    color: white;
}

.primary-button span {
    margin-left: 8px;

    display: inline-block;

    transition: transform 0.2s ease;
}

.primary-button:hover {
    background: #222;
    transform: translateY(-2px);
}

.primary-button:hover span {
    transform: translateX(5px);
}

.secondary-button {
    background: white;
    color: #333;
}

.secondary-button:hover {
    background: #222;
    color: white;
}

.hero-note {
    margin-top: 18px;

    color: #999;

    font-size: 12px;
}


/* PRIME LOGO */

.prime-logo {
    width: 400px;
    height: 400px;

    margin-right: 4%;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-circle {
    width: 280px;
    height: 280px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #222;

    box-shadow:
        20px 20px 0 #f16d01,
        0 25px 60px rgba(0,0,0,0.15);
}

.logo-circle span {
    color: white;

    font-size: 48px;
    font-weight: 800;

    letter-spacing: -3px;
}

.logo-arrow {
    position: absolute;

    bottom: 55px;
    right: 20px;

    width: 80px;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #f16d01;
    color: white;

    border-radius: 50%;

    font-size: 35px;
}


/* =========================
   BENEFITS
========================= */

.benefits-section {
    padding: 55px 6%;
    background: white;
}

.section-label {
    margin: 0 0 25px;

    color: #949494;

    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.5px;
}

.benefits-grid {
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 20px;
}

.benefit-card {
    padding: 30px;

    min-height: 230px;

    background: #f5f5f5;

    border-radius: 12px;

    transition: all 0.25s ease;
}

.benefit-card:hover {
    background: #e7e5e5;

    transform: translateY(-4px);
}

.benefit-icon {
    width: 52px;
    height: 52px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 25px;

    background: white;

    border-radius: 50%;

    font-size: 24px;
}

.benefit-card h3 {
    margin: 0 0 10px;

    font-size: 19px;
}

.benefit-card p {
    margin: 0;

    color: #777;

    font-size: 14px;
    line-height: 1.6;
}


/* =========================
   PRICING
========================= */

.pricing-section {
    padding: 80px 6%;
    background: #e7e5e5;
}

.pricing-heading {
    text-align: center;
}

.pricing-heading .section-label {
    text-align: center;
}

.pricing-heading h2,
.comparison-section h2,
.prime-cta h2 {
    margin: 0;

    font-size: 42px;
    letter-spacing: -2px;
}

.pricing-heading h2 span,
.comparison-section h2 span,
.prime-cta h2 span {
    color: #f16d01;
}

.pricing-heading > p:last-child {
    color: #777;
}


/* BILLING */

.billing-switch {
    width: fit-content;

    display: flex;

    margin: 35px auto;

    padding: 5px;

    background: white;

    border-radius: 50px;
}

.billing-switch button {
    border: none;

    padding: 11px 20px;

    border-radius: 40px;

    background: transparent;

    cursor: pointer;

    font-weight: 600;
}

.billing-switch button.active {
    background: #222;
    color: white;
}

.save-badge {
    margin-left: 5px;

    color: #f16d01;

    font-size: 10px;
}


/* PLANS */

.plans-grid {
    max-width: 1250px;

    margin: auto;

    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 20px;

    align-items: stretch;
}

.plan-card {
    position: relative;

    display: flex;
    flex-direction: column;

    padding: 32px;

    background: white;

    border-radius: 14px;

    min-height: 560px;

    border: 2px solid transparent;

    transition: all 0.25s ease;
}

.plan-card:hover {
    transform: translateY(-5px);

    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
}

.plan-card.popular {
    border-color: #f16d01;

    box-shadow: 0 15px 40px rgba(241,109,1,0.12);
}

.popular-badge {
    position: absolute;

    top: -13px;
    left: 50%;

    transform: translateX(-50%);

    padding: 7px 15px;

    border-radius: 30px;

    background: #f16d01;
    color: white;

    font-size: 10px;
    font-weight: 800;

    white-space: nowrap;
}

.plan-name {
    margin: 0 0 10px;

    font-size: 21px;
    font-weight: 800;
}

.plan-description {
    min-height: 45px;

    margin: 0;

    color: #777;

    font-size: 13px;
    line-height: 1.5;
}

.plan-price {
    margin-top: 25px;

    display: flex;
    align-items: baseline;
}

.price {
    font-size: 48px;

    font-weight: 800;

    letter-spacing: -2px;
}

.period {
    color: #888;

    font-size: 14px;
}

.billed {
    margin: 3px 0 0;

    color: #f16d01;

    font-size: 11px;
}

.plan-divider {
    height: 1px;

    margin: 25px 0;

    background: #eee;
}

.features-title {
    margin: 0 0 15px;

    font-size: 13px;
    font-weight: 700;
}

.feature {
    display: flex;

    gap: 10px;

    margin-bottom: 13px;

    color: #555;

    font-size: 13px;
    line-height: 1.4;
}

.check {
    color: #f16d01;

    font-weight: 900;
}

.plan-button {
    width: 100%;

    margin-top: auto;

    padding: 14px;

    border: none;
    border-radius: 40px;

    background: #222;
    color: white;

    cursor: pointer;

    font-weight: 600;

    transition: all 0.25s ease;
}

.plan-button.highlighted {
    background: #f16d01;
}

.plan-button:hover {
    background: #f16d01;
}

.plan-button span {
    margin-left: 7px;
}


/* =========================
   COMPARISON
========================= */

.comparison-section {
    padding: 80px 8%;

    background: white;
}

.comparison-section h2 {
    margin-bottom: 35px;
}

.comparison-table {
    max-width: 1100px;

    margin: auto;

    border: 1px solid #ddd;

    border-radius: 12px;

    overflow: hidden;
}

.comparison-row {
    display: grid;

    grid-template-columns: 2fr repeat(3, 1fr);

    min-height: 58px;

    border-bottom: 1px solid #eee;
}

.comparison-row:last-child {
    border-bottom: none;
}

.comparison-row > div {
    display: flex;

    align-items: center;

    padding: 15px 20px;

    color: #555;

    font-size: 13px;
}

.comparison-row > div:not(:first-child) {
    justify-content: center;

    color: #f16d01;

    font-weight: 700;

    border-left: 1px solid #eee;
}

.comparison-header {
    background: #222;
}

.comparison-header > div {
    color: white !important;

    font-weight: 700;
}

.comparison-header > div:not(:first-child) {
    color: white !important;
}


/* =========================
   FINAL CTA
========================= */

.prime-cta {
    min-height: 300px;

    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 40px;

    padding: 60px 10%;

    background: #222;

    color: white;
}

.prime-cta .section-label {
    color: #999;
}

.prime-cta h2 {
    font-size: 46px;
}

.prime-cta p:last-child {
    color: #999;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1000px) {

    .prime-hero {
        padding: 60px 6%;
    }

    .prime-logo {
        width: 300px;
        height: 300px;
    }

    .logo-circle {
        width: 210px;
        height: 210px;
    }

    .logo-circle span {
        font-size: 38px;
    }

    .benefits-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .plans-grid {
        grid-template-columns: 1fr;
        max-width: 550px;
    }

    .plan-card {
        min-height: auto;
    }
}


@media (max-width: 700px) {

    .prime-hero {
        min-height: auto;

        flex-direction: column;

        align-items: flex-start;

        padding: 50px 25px;
    }

    .prime-hero h1 {
        font-size: 52px;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .hero-buttons button {
        width: 100%;
    }

    .prime-logo {
        align-self: center;

        margin: 50px 0 20px;
    }

    .benefits-section,
    .pricing-section,
    .comparison-section {
        padding: 50px 20px;
    }

    .benefits-grid {
        grid-template-columns: 1fr;
    }

    .pricing-heading h2,
    .comparison-section h2 {
        font-size: 34px;
    }

    .comparison-section {
        overflow-x: auto;
    }

    .comparison-table {
        min-width: 650px;
    }

    .prime-cta {
        flex-direction: column;

        align-items: flex-start;

        padding: 50px 25px;
    }

    .prime-cta h2 {
        font-size: 38px;
    }

}

</style>
