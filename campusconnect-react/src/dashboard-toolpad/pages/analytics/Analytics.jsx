// campusconnect-react/src/dashboard-toolpad/components/Index.jsx
import React from 'react';
import {PageContainer} from "@toolpad/core/PageContainer";

function Analytics() {
    return (
        <PageContainer
            title="Analytics"
            breadcrumbs={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Reports', href: '/reports' },
                { label: 'Analytics' }
            ]}
        >
            Analytics Content
        </PageContainer>
    )
}

export default Analytics;