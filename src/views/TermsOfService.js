import { useEffect } from 'react';
import Banner from '../components/Banner';
import '../styles/views/TermsOfService.css';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div class="legal tos-container">
            <Banner color={"grey"}/>
            <h1>API POOL - Terms of Service</h1>

            <h2>1. Introduction</h2>
            <p>Welcome to API POOL! API POOL ("We", "Our", "Us") provides a platform where users can use, create, and publish API services, including but not limited to AI APIs such as image generation and voice generation. By accessing or using our platform, you ("User", "You") agree to comply with and be bound by these Terms of Service ("Terms" or "ToS"). If you do not agree to these terms, please do not use our platform.</p>

            <h2>2. Acceptance of Terms</h2>
            <p>By registering an account, logging in, or otherwise accessing or using API POOL, you agree to be bound by these Terms. If you do not agree to all of these Terms, do not use or access the platform.</p>

            <h2>3. Modifications to Terms</h2>
            <p>We reserve the right to modify these Terms at any time at our sole discretion. When we make changes, we will notify users by sending an email with the updated Terms. Continued use of the platform following such modifications indicates your acceptance of the new Terms.</p>

            <h2>4. Definitions</h2>
            <p><strong>Platform or API POOL:</strong> Refers to our website and services that enable users to use, create, and publish API services, including AI APIs like image generation and voice generation.</p>
            <p><strong>Users:</strong> Individuals or entities that register to use the platform, including those who create and publish APIs and those who use them.</p>
            <p><strong>APIs:</strong> Application Programming Interfaces created, published, and used through API POOL.</p>
            <p><strong>Services:</strong> Includes all functionalities and features provided by API POOL.</p>

            <h2>5. Account Registration and Use</h2>
            <h3>5.1 Eligibility</h3>
            <p>To use API POOL, you must be at least 18 years old and capable of entering into legally binding agreements. By registering an account, you represent and warrant that you meet these criteria.</p>

            <h3>5.2 Account Security</h3>
            <p>You are responsible for maintaining the security of your account, including the confidentiality of your login credentials. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</p>

            <h3>5.3 Account Information</h3>
            <p>When registering, you must provide accurate and complete information. Users can log in using their GitHub, Google, or their email.</p>

            <h2>6. User Profiles</h2>
            <p>Your user profile on API POOL will only display your username and will not include any personally identifying information such as your real name or email address. However, you understand and agree that any API you create and publish will be publicly accessible and may be used commercially by other users or third parties.</p>

            <h2>7. Creating and Publishing APIs</h2>
            <h3>7.1 Public Accessibility</h3>
            <p>By creating and publishing an API on API POOL, you consent to making the API publicly accessible. You acknowledge and agree that published APIs can be used by other users and third parties, including for commercial purposes.</p>

            <h3>7.2 Ownership and Rights</h3>
            <p>You retain ownership of any original API you publish. However, by publishing an API on API POOL, you grant us and other users a non-exclusive, worldwide, royalty-free, transferable, sublicensable license to use, reproduce, distribute, and display your API.</p>

            <h2>8. Acceptable Use</h2>
            <p>Users agree to use API POOL in compliance with all applicable laws and regulations. You must not:</p>
            <ul>
                <li>Engage in any activity that interferes with or disrupts the platform.</li>
                <li>Use the platform for any illegal activities or harmful purposes.</li>
                <li>Share or distribute content that is unlawful, harmful, threatening, defamatory, obscene, or otherwise objectionable.</li>
            </ul>

            <h2>9. Termination</h2>
            <p>We reserve the right to suspend or terminate your account and access to API POOL, at our sole discretion, with or without notice and without liability to you, if we believe that you have violated these Terms or your use of the platform poses a security risk.</p>

            <h2>10. Disclaimers</h2>
            <p>API POOL is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free from viruses or other harmful components.</p>

            <h2>11. Limitation of Liability</h2>
            <p>In no event shall API POOL, its directors, employees, or agents, be liable to you for any indirect, incidental, special, punitive, or consequential damages arising out of or in connection with your use of the platform.</p>

            <h2>12. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which API POOL operates, without regard to its conflict of law principles.</p>

            <h2>13. Contact Information</h2>
            <p>If you have any questions or concerns regarding these Terms, please contact us at <a href="mailto:support@apipool.com">support@apipool.com</a>.</p>

            <p>By creating and/or using an account on API POOL, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. Thank you for using API POOL!</p>
        </div>

    )
};

export default TermsOfService;