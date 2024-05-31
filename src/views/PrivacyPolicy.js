import { useEffect } from "react";
import Banner from "../components/Banner";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal pp-container">
            <Banner color={"grey"} height={"150px"} />
            <h1>API POOL - Privacy Policy</h1>

            <h2>1. Introduction</h2>
            <p>Welcome to API POOL! We ("API POOL", "We", "Our", "Us") value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform.</p>

            <h2>2. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul>
                <li><strong>Personal Information:</strong> When you sign up or log in using your email, Google, or GitHub accounts, we collect your email address and hashed passwords.</li>
                <li><strong>Usage Data:</strong> We collect statistics such as execution times of your requests to the APIs in order to improve our service.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
                <li><strong>Account Management:</strong> To manage your API POOL account and authenticate your access.</li>
                <li><strong>Service Improvement:</strong> To analyze usage data and improve our platform's performance and features.</li>
                <li><strong>Communication:</strong> To inform you about any updates to our Privacy Policy or Terms of Service.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We are committed to ensuring that your information is secure. All user passwords are hashed in our database to protect your data from unauthorized access. Your personal information cannot be accessed by other users unless you publish an API, in which case only your username will be shown.</p>

            <h2>5. Sharing of Information</h2>
            <p>API POOL does not share your personal information with any other services or companies. Your information is used solely for the purposes outlined in this Privacy Policy.</p>

            <h2>6. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we make changes, we will notify users by sending an email with the updated Privacy Policy. Continued use of the platform following such modifications indicates your acceptance of the new Privacy Policy.</p>

            <h2>7. Acceptance of This Policy</h2>
            <p>By signing up for an account on API POOL, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.</p>

            <h2>8. Contact Information</h2>
            <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at <a href="mailto:support@apipool.com">support@apipool.com</a>.</p>

            <p>Thank you for using API POOL!</p>
        </div>
    )
}

export default PrivacyPolicy;