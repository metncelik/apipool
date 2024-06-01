import { useEffect } from "react";
import Banner from "../components/Banner";

const RefundPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal rp-container">
            <Banner color="grey"/>
            <h1>API POOL - Refund Policy</h1>

            <h2>1. Introduction</h2>
            <p>Welcome to API POOL! This Refund Policy ("Policy") outlines the terms and conditions under which users ("You", "User") may be eligible for refunds when using the services provided by API POOL ("We", "Our", "Us"). By signing up and using API POOL, you acknowledge and agree to this Refund Policy.</p>

            <h2>2. Charges and Requests</h2>
            <p>Users will be charged when a request to use an API is successfully completed. It is the user's responsibility to ensure that their API requests are valid and authorized.</p>

            <h2>3. No Refunds for User Mistakes</h2>
            <p>API POOL will not issue refunds under the following circumstances:</p>
            <ul>
                <li><strong>Public Disclosure of API Keys:</strong> If your API keys are revealed publicly due to your own actions or negligence, we will not provide any refunds.</li>
                <li><strong>Faulty User-Created APIs:</strong> If you create an API with issues that result in excessive costs or incorrect outcomes, we will not provide any refunds. Users are responsible for thoroughly testing and validating their APIs before publishing.</li>
            </ul>

            <h2>4. Refund Eligibility for Our Mistakes</h2>
            <p>Users may be eligible for a refund only in the following situations:</p>
            <ul>
                <li><strong>Service Errors:</strong> If a service failure or error occurs due to API POOL's fault, we will investigate the issue and determine if a refund is warranted.</li>
                <li><strong>Security Breaches:</strong> In the event of a cyber attack or security breach that compromises user data or API requests through no fault of the user, we will take appropriate actions and may issue refunds as deemed necessary.</li>
            </ul>

            <h2>5. Refund Request Process</h2>
            <p>To request a refund, users must contact us within 30 days of the transaction in question. Refund requests should include the following information:</p>
            <ul>
                <li>Username and email address associated with the account</li>
                <li>Details of the transaction and the reason for the refund request</li>
            </ul>
            <p>Submit refund requests to <a href="mailto:support@apipool.com">support@apipool.com</a>. We will review your request and respond within 10 business days.</p>

            <h2>6. Changes to This Refund Policy</h2>
            <p>We reserve the right to update this Refund Policy from time to time. When changes are made, we will notify users by sending an email with the updated Refund Policy. Continued use of the platform following such modifications indicates your acceptance of the new Refund Policy.</p>

            <h2>7. Acceptance of This Policy</h2>
            <p>By signing up for an account on API POOL, you acknowledge that you have read, understood, and agree to be bound by this Refund Policy.</p>

            <h2>8. Contact Information</h2>
            <p>If you have any questions or concerns regarding this Refund Policy, please contact us at <a href="mailto:support@apipool.com">support@apipool.com</a>.</p>

            <p>Thank you for using API POOL!</p>
        </div>
    );
}

export default RefundPolicy;