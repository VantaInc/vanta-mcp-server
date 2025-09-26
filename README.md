# Vanta MCP Server

A [Model Context Protocol](https://modelcontextprotocol.com/) server that provides access to Vanta's automated security compliance platform. Vanta helps organizations achieve and maintain compliance with security frameworks like SOC 2, ISO 27001, HIPAA, GDPR, and others through automated monitoring, evidence collection, and continuous security testing. This MCP server enables AI assistants to interact with Vanta's API to retrieve compliance test results, manage security findings, and access framework requirements.

> **⚠️ Important Disclaimer:** This experimental server is currently in **public preview** and provides AI assistants with access to your Vanta compliance data. You may encounter bugs, errors or unexpected results. Always verify the accuracy and appropriateness of AI-generated responses before taking any compliance or security actions. Users are responsible for reviewing all outputs and ensuring they meet their organization's security and compliance requirements.

## Features

### Controls

- List all security controls across all frameworks in your Vanta account
- View control names, descriptions, framework mappings, and implementation status
- Get specific tests that validate each security control
- Access pre-built controls from Vanta's control library
- View documents providing evidence for specific security controls
- Understand which automated tests monitor compliance for specific controls

| Tool Name                                                                              | Description                                                                                                                                                         |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`controls`](https://developer.vanta.com/reference/listcontrols)                       | List all security controls across all frameworks in your Vanta account. Returns control names, descriptions, framework mappings, and current implementation status. |
| [`list_control_tests`](https://developer.vanta.com/reference/listtestsforcontrol)      | Get all automated tests that validate a specific security control. Returns test details, current status, and any failing entities for the control's tests.          |
| [`list_library_controls`](https://developer.vanta.com/reference/listlibrarycontrols)   | List Vanta controls from the library. These are pre-built security controls available in Vanta's control library that can be added to your account.                 |
| [`list_control_documents`](https://developer.vanta.com/reference/listcontroldocuments) | List a control's documents. Get all documents that are associated with or provide evidence for a specific security control.                                         |
| [`controls`](https://developer.vanta.com/reference/getcontrol)                         | Get control by an ID. Retrieve detailed information about a specific security control when its ID is known.                                                         |

### Discovered Vendors

- Identify unmanaged vendors detected by Vanta's discovery engine
- Review automatically discovered vendor profiles before they are confirmed as managed vendors
- Inspect accounts associated with a discovered vendor to understand potential risk exposure

| Tool Name                                                                                               | Description                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`list_discovered_vendors`](https://developer.vanta.com/reference/listdiscoveredvendors)                | List discovered vendors identified by Vanta's automated discovery. Returns vendor names, domains, discovery sources, and linkage status to managed vendor records. |
| [`list_discovered_vendor_accounts`](https://developer.vanta.com/reference/listdiscoveredvendoraccounts) | List accounts associated with a discovered vendor. Provide discoveredVendorId to retrieve account identifiers, connection details, and discovery metadata.         |

### Documents

- List all documents in your Vanta account for compliance and evidence management
- Get detailed information about specific documents including metadata and compliance mappings
- Access document-related resources including controls, links, and uploads through intelligent consolidation
- Intelligently download file uploads with automatic MIME type handling - text files return readable content, binary files return metadata

| Tool Name                                                                           | Description                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`documents`](https://developer.vanta.com/reference/listdocuments)                  | Access documents in your Vanta account. Provide documentId to get a specific document, or omit to list all documents. Returns document IDs, names, types, and metadata for compliance and evidence management. |
| [`document_resources`](https://developer.vanta.com/reference/listdocumentcontrols)  | Access document-related resources including controls, links, and uploads. Specify resourceType ('controls', 'links', 'uploads') to get the specific type of resource associated with a document.               |
| [`download_document_file`](https://developer.vanta.com/reference/getdocumentupload) | Download document file by upload ID. Get the actual uploaded document file. Intelligently handles different MIME types: returns text content for readable files, metadata information for binary files.        |

### Frameworks

- List all compliance frameworks available in your Vanta account (SOC 2, ISO 27001, HIPAA, GDPR, etc.)
- View completion status and progress metrics for each framework
- Get detailed security control requirements for specific compliance frameworks
- Access implementation guidance and current compliance status for framework controls

| Tool Name                                                                                | Description                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`frameworks`](https://developer.vanta.com/reference/listframeworks)                     | List all compliance frameworks available in your Vanta account (SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP, PCI, etc.) along with completion status and progress metrics.                      |
| [`list_framework_controls`](https://developer.vanta.com/reference/listframeworkcontrols) | Get detailed security control requirements for a specific compliance framework. Returns the specific controls, their descriptions, implementation guidance, and current compliance status. |
| [`frameworks`](https://developer.vanta.com/reference/getframework)                       | Get framework by ID. Retrieve detailed information about a specific compliance framework when its ID is known.                                                                             |

### Groups

- List all organizational groups for structure and access management
- Get detailed group information including member counts and access permissions
- View group membership to understand who has group-based access permissions

| Tool Name                                                                    | Description                                                                                                                                     |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [`groups`](https://developer.vanta.com/reference/listgroups)                 | List all groups in your Vanta account. Returns group IDs, names, descriptions, and metadata for organizational structure and access management. |
| [`groups`](https://developer.vanta.com/reference/getgroup)                   | Get group by ID. Retrieve detailed information about a specific group when its ID is known.                                                     |
| [`list_group_people`](https://developer.vanta.com/reference/listgrouppeople) | List people in a group. Get all people who are members of a specific group for organizational structure and access management.                  |

### Integrations

- List all connected integrations in your Vanta account (AWS, Azure, GCP, Snyk, etc.)
- Get detailed information about specific integrations and their configurations
- Access integration resources including resource kinds, resource details, and specific resources through intelligent consolidation
- Monitor which integrations are actively connected to your instance

| Tool Name                                                                                  | Description                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`integrations`](https://developer.vanta.com/reference/listintegrations)                   | Access connected integrations in your Vanta account. Provide integrationId to get a specific integration, or omit to list all integrations. Returns integration details, supported resource kinds, and connection status for compliance monitoring. |
| [`integration_resources`](https://developer.vanta.com/reference/listresourcekindsummaries) | Access integration resources including resource kinds, resource kind details, and specific resources. Specify operation ('list_kinds', 'get_kind_details', 'list_resources', 'get_resource') to perform the desired action.                         |

### Monitored Computers

- Monitor all computers across your organization for compliance and security
- Access detailed computer information including hostnames, operating systems, and security status
- Manage endpoint security and compliance across diverse computing environments

| Tool Name                                                                             | Description                                                                                                                                               |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`monitored_computers`](https://developer.vanta.com/reference/listmonitoredcomputers) | List monitored computers in your Vanta account. Returns computer IDs, hostnames, operating systems, and security status for endpoint security management. |
| [`monitored_computers`](https://developer.vanta.com/reference/getmonitoredcomputer)   | Get monitored computer by ID. Retrieve detailed information about a specific monitored computer when its ID is known.                                     |

### People

- List all people in your organization for compliance and security management
- Access detailed person information including roles, email addresses, and group memberships
- Manage organizational structure and access control through comprehensive people data

| Tool Name                                                    | Description                                                                                                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`people`](https://developer.vanta.com/reference/listpeople) | List all people in your Vanta account. Returns person IDs, names, email addresses, and metadata for organizational structure and access management. |
| [`people`](https://developer.vanta.com/reference/getperson)  | Get person by ID. Retrieve detailed information about a specific person when their ID is known.                                                     |

### Policies

- List all policies in your Vanta account for compliance and governance management
- Get detailed policy information including content, approval status, and compliance mappings
- Access organizational policies for security, privacy, and operational governance
- View policy metadata including names, types, and associated compliance frameworks

| Tool Name                                                        | Description                                                                                                                       |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [`policies`](https://developer.vanta.com/reference/listpolicies) | List all policies in your Vanta account. Returns policy IDs, names, types, and metadata for compliance and governance management. |
| [`policies`](https://developer.vanta.com/reference/getpolicy)    | Get policy by ID. Retrieve detailed information about a specific policy when its ID is known.                                     |

### Risks

- Get all the risk scenarios you are managing in your current risk register
- Returns details about each risk scenario's status, inherent & residual risk score, treatment plan, and more
- Filterable by risk category (Access Control, Cryptography, Privacy, and many others)

| Tool Name                                                          | Description                                                                                                                                                                             |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`risks`](https://developer.vanta.com/reference/listriskscenarios) | Get all the risk scenarios you are managing in your current risk register. Returns details about each risk scenario's status, inherent & residual risk score, treatment plan, and more. |
| [`risks`](https://developer.vanta.com/reference/getriskscenario)   | Get risk scenario by ID. Retrieve detailed information about a specific risk scenario when its ID is known.                                                                             |

### Tests

- Access Vanta's 1,200+ automated security tests that run continuously to monitor compliance
- Filter by status (OK, NEEDS_ATTENTION, DEACTIVATED), cloud integration, or compliance framework
- Get specific resources (entities) that are failing particular security tests
- Essential for understanding exactly which infrastructure components need remediation

| Tool Name                                                                     | Description                                                                                                                                                                                          |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`list_tests`](https://developer.vanta.com/reference/listtests)               | Retrieve Vanta's automated security and compliance tests. Filter by status, cloud integration, or compliance framework. Returns test results showing which security controls are passing or failing. |
| [`list_test_entities`](https://developer.vanta.com/reference/gettestentities) | Get specific resources (entities) that are failing a particular security test. Essential for understanding exactly which infrastructure components need remediation.                                 |
| [`get_test`](https://developer.vanta.com/reference/gettest)                   | Get the details of a specific test by its ID. The ID of a test may be retrieved from the list_tests response or from the address bar of your browser.                                                |

### Trust Centers

- Access complete Trust Center configuration, branding, and public visibility settings
- Manage Trust Center access requests from potential customers and stakeholders
- Track detailed viewer activity and engagement analytics across Trust Center content
- Organize and manage control categories for clear compliance presentation
- Publish and manage compliance controls with implementation details and evidence
- Maintain comprehensive FAQ sections for customer transparency and communication
- Provide downloadable resources including compliance documents and certifications
- Enable customer self-service access to compliance and security information

| Tool Name                                                                                                                       | Description                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`get_trust_center`](https://developer.vanta.com/reference/gettrustcenter)                                                      | Get Trust Center information. Retrieve detailed information about a specific Trust Center including configuration, branding, and public visibility settings.                            |
| [`trust_center_access_requests`](https://developer.vanta.com/reference/listtrustcenteraccessrequests)                           | List Trust Center access requests. Get all pending and processed access requests for a specific Trust Center.                                                                           |
| [`trust_center_access_requests`](https://developer.vanta.com/reference/gettrustcenteraccessrequest)                             | Get Trust Center access request by ID. Retrieve detailed information about a specific access request including requester details, status, and request metadata.                         |
| [`list_trust_center_viewer_activity_events`](https://developer.vanta.com/reference/listtrustcentervieweractivityevents)         | List Trust Center viewer activity events. Get all viewer activity and engagement events for a specific Trust Center including page views, document downloads, and user interactions.    |
| [`trust_center_control_categories`](https://developer.vanta.com/reference/listtrustcentercontrolcategories)                     | List Trust Center control categories. Get all control categories configured for a specific Trust Center including category names, descriptions, and organization.                       |
| [`trust_center_control_categories`](https://developer.vanta.com/reference/gettrustcentercontrolcategory)                        | Get Trust Center control category by ID. Retrieve detailed information about a specific control category including its configuration, associated controls, and display settings.        |
| [`trust_center_controls`](https://developer.vanta.com/reference/listtrustcentercontrols)                                        | List Trust Center controls. Get all compliance controls published in a specific Trust Center including control descriptions, implementation status, and evidence.                       |
| [`trust_center_controls`](https://developer.vanta.com/reference/gettrustcentercontrol)                                          | Get Trust Center control by ID. Retrieve detailed information about a specific control published in the Trust Center including implementation details, evidence, and compliance status. |
| [`trust_center_faqs`](https://developer.vanta.com/reference/listtrustcenterfaqs)                                                | List Trust Center FAQs. Get all frequently asked questions configured for a specific Trust Center including questions, answers, and organization.                                       |
| [`trust_center_faqs`](https://developer.vanta.com/reference/gettrustcenterfaq)                                                  | Get Trust Center FAQ by ID. Retrieve detailed information about a specific FAQ including the question, answer, and display settings.                                                    |
| [`list_trust_center_resources`](https://developer.vanta.com/reference/listtrustcenterresources)                                 | List Trust Center resources. Get all resources and documents available in a specific Trust Center including compliance documents, certifications, and downloadable materials.           |
| [`get_trust_center_document`](https://developer.vanta.com/reference/gettrustcenterdocument)                                     | Get Trust Center document by ID. Retrieve detailed information about a specific document published in the Trust Center including metadata, content, and access settings.                |
| [`get_trust_center_resource_media`](https://developer.vanta.com/reference/gettrustcenterresourcemedia)                          | Download Trust Center document media. Get the actual uploaded document/media file for a Trust Center resource for review or audit purposes.                                             |
| [`trust_center_subprocessors`](https://developer.vanta.com/reference/listtrustcentersubprocessors)                              | List Trust Center subprocessors. Get all subprocessors displayed in a specific Trust Center for third-party service provider transparency.                                              |
| [`trust_center_subprocessors`](https://developer.vanta.com/reference/gettrustcentersubprocessor)                                | Get Trust Center subprocessor by ID. Retrieve detailed information about a specific subprocessor including compliance details and certifications.                                       |
| [`trust_center_updates`](https://developer.vanta.com/reference/listtrustcenterupdates)                                          | List Trust Center updates. Get all updates and announcements published in a specific Trust Center for compliance status changes and notifications.                                      |
| [`trust_center_updates`](https://developer.vanta.com/reference/gettrustcenterupdate)                                            | Get Trust Center update by ID. Retrieve detailed information about a specific update including content, publication date, and compliance impact.                                        |
| [`trust_center_viewers`](https://developer.vanta.com/reference/listtrustcenterviewers)                                          | List Trust Center viewers. Get all users who have access to view a specific Trust Center for access management and audit purposes.                                                      |
| [`trust_center_viewers`](https://developer.vanta.com/reference/gettrustcenterviewer)                                            | Get Trust Center viewer by ID. Retrieve detailed information about a specific viewer including access permissions and activity history.                                                 |
| [`get_trust_center_subscriber`](https://developer.vanta.com/reference/gettrustcentersubscriber)                                 | Get Trust Center subscriber by ID. Retrieve detailed information about a specific subscriber including subscription preferences and notification settings.                              |
| [`trust_center_subscriber_groups`](https://developer.vanta.com/reference/gettrustcentersubscribergroup)                         | Get Trust Center subscriber group by ID. Retrieve detailed information about a specific subscriber group including members and notification preferences.                                |
| [`trust_center_subscriber_groups`](https://developer.vanta.com/reference/listtrustcentersubscribergroups)                       | List Trust Center subscriber groups. Get all subscriber groups configured for a specific Trust Center for notification group management.                                                |
| [`list_trust_center_historical_access_requests`](https://developer.vanta.com/reference/listtrustcenterhistoricalaccessrequests) | List Trust Center historical access requests. Get all past access requests for a specific Trust Center for audit and compliance tracking.                                               |
| [`list_trust_center_subscribers`](https://developer.vanta.com/reference/listtrustcentersubscribers)                             | List Trust Center subscribers. Get all subscribers to a specific Trust Center for update notifications and communication management.                                                    |

### Vendor Risk Attributes

- Understand available vendor risk attributes for comprehensive risk assessment
- Categorize and evaluate vendor risks using standardized risk assessment criteria
- Access risk attribute IDs, names, categories, and assessment criteria for vendor risk management

| Tool Name                                                                                       | Description                                                                                                                                           |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`list_vendor_risk_attributes`](https://developer.vanta.com/reference/listvenderriskattributes) | List vendor risk attributes in your Vanta account. Returns risk attribute IDs, names, categories, and assessment criteria for vendor risk management. |

### Vendors

- List all vendors in your Vanta account for vendor risk management
- Get detailed vendor information including contact details and website URLs
- Access vendor compliance data including documents, findings, and security reviews through intelligent consolidation
- Manage vendor relationships and due diligence tracking
- Review history of security assessments and due diligence activities through consolidated access

| Tool Name                                                                                                   | Description                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`vendors`](https://developer.vanta.com/reference/listvendors)                                              | Access vendors in your Vanta account. Provide vendorId to get a specific vendor, or omit to list all vendors. Returns vendor details, risk levels, and management status for third-party risk assessment.                |
| [`vendor_compliance`](https://developer.vanta.com/reference/listvendordocuments)                            | Access vendor compliance data including documents, findings, and security reviews. Specify complianceType ('documents', 'findings', 'security_reviews') to get the specific type of compliance information for a vendor. |
| [`get_vendor_security_review`](https://developer.vanta.com/reference/getsecurityreviewsbyid)                | Get vendor security review by ID. Retrieve detailed information about a specific security review for a vendor.                                                                                                           |
| [`list_vendor_security_review_documents`](https://developer.vanta.com/reference/getsecurityreviewdocuments) | List vendor security review's documents. Get all documents associated with a specific vendor security review.                                                                                                            |

### Vulnerabilities

- Monitor all vulnerabilities detected across your infrastructure and applications
- Access detailed vulnerability information including CVE data, severity levels, and affected assets

| Tool Name                                                                      | Description                                                                                                                                                          |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`vulnerabilities`](https://developer.vanta.com/reference/listvulnerabilities) | Get vulnerabilities in your Vanta account. Returns vulnerability IDs, CVE information, severity levels, and affected assets for security monitoring and remediation. |
| [`vulnerabilities`](https://developer.vanta.com/reference/getvulnerability)    | Get vulnerability by ID. Retrieve detailed information about a specific vulnerability when its ID is known.                                                          |

### Vulnerability Remediations

- Track vulnerability remediation efforts and timelines for security management
- Ensure timely resolution of security issues through comprehensive remediation tracking

| Tool Name                                                                                                | Description                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`list_vulnerability_remediations`](https://developer.vanta.com/reference/listvulnerabilityremediations) | List vulnerability remediations in your Vanta account. Returns remediation IDs, associated vulnerabilities, remediation status, and timeline information for security management. |

### Vulnerable Assets

- Identify vulnerable assets and understand their security status
- Prioritize security efforts based on asset vulnerability associations and risk levels

| Tool Name                                                                         | Description                                                                                                                                                                                |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`vulnerable_assets`](https://developer.vanta.com/reference/listvulnerableassets) | List assets associated with vulnerabilities in your Vanta account. Returns asset IDs, vulnerability associations, asset types, and security status for infrastructure security management. |
| [`vulnerable_assets`](https://developer.vanta.com/reference/getvulnerableasset)   | Get vulnerable asset by ID. Retrieve detailed information about a specific vulnerable asset when its ID is known.                                                                          |

### Multi-Region Support

- US, EU, and AUS regions with region-specific API endpoints
- Global compliance support for distributed organizations

## Tools

| Tool Name                                                                                                               | Description                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`list_tests`](https://developer.vanta.com/reference/listtests)                                                         | Retrieve Vanta's automated security and compliance tests. Filter by status (OK, NEEDS_ATTENTION, DEACTIVATED), cloud integration (aws, azure, gcp), or compliance framework (soc2, iso27001, hipaa). Returns test results showing which security controls are passing or failing across your infrastructure.                        |
| [`list_test_entities`](https://developer.vanta.com/reference/gettestentities)                                           | Get specific resources (entities) that are failing a particular security test. For example, if an AWS security group test is failing, this returns the actual security group IDs and details about what's wrong. Essential for understanding exactly which infrastructure components need remediation.                              |
| [`get_test`](https://developer.vanta.com/reference/gettest)                                                             | Get the details of a specific test by its ID. The ID of a test may be retrieved from the `list_tests` response or from the address bar of your browser after /tests/.                                                                                                                                                               |
| [`frameworks`](https://developer.vanta.com/reference/listframeworks)                                                    | List all compliance frameworks available in your Vanta account (SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP, PCI, etc.) along with completion status and progress metrics. Shows which frameworks you're actively pursuing and their current compliance state.                                                                           |
| [`list_framework_controls`](https://developer.vanta.com/reference/listframeworkcontrols)                                | Get detailed security control requirements for a specific compliance framework. Returns the specific controls, their descriptions, implementation guidance, and current compliance status. Essential for understanding what security measures are required for each compliance standard.                                            |
| [`frameworks`](https://developer.vanta.com/reference/getframework)                                                      | Get framework by ID. Retrieve detailed information about a specific compliance framework when its ID is known. The ID of a framework can be found from frameworks response. Returns complete framework details including name, description, completion status, progress metrics, and compliance state.                              |
| [`controls`](https://developer.vanta.com/reference/listcontrols)                                                        | List all security controls across all frameworks in your Vanta account. Returns control names, descriptions, framework mappings, and current implementation status. Use this to see all available controls or to find a specific control ID for use with other tools.                                                               |
| [`list_control_tests`](https://developer.vanta.com/reference/listtestsforcontrol)                                       | Get all automated tests that validate a specific security control. Use this when you know a control ID and want to see which specific tests monitor compliance for that control. Returns test details, current status, and any failing entities for the control's tests.                                                            |
| [`list_library_controls`](https://developer.vanta.com/reference/listlibrarycontrols)                                    | List Vanta controls from the library. These are pre-built security controls available in Vanta's control library that can be added to your account. Different from controls which lists controls already in your account - this shows available controls you can implement.                                                         |
| [`list_control_documents`](https://developer.vanta.com/reference/listcontroldocuments)                                  | List a control's documents. Get all documents that are associated with or provide evidence for a specific security control. Use this when you know a control ID and want to see which documents are mapped to that control for compliance evidence.                                                                                 |
| [`controls`](https://developer.vanta.com/reference/getcontrol)                                                          | Get control by an ID. Retrieve detailed information about a specific security control when its ID is known. The ID of a control can be found from controls or list_framework_controls responses. Returns complete control details including name, description, framework mappings, and implementation status.                       |
| [`risks`](https://developer.vanta.com/reference/listriskscenarios)                                                      | Get all the risk scenarios you are managing in your current risk register. Returns details about each risk scenario's status, inherent & residual risk score, treatment plan, and more. Filterable by risk category (Access Control, Cryptography, Privacy, and many others).                                                       |
| [`risks`](https://developer.vanta.com/reference/getriskscenario)                                                        | Get risk scenario by ID. Retrieve detailed information about a specific risk scenario when its ID is known. The ID of a risk scenario can be found from risks response. Returns complete risk details including status, inherent & residual risk scores, treatment plan, and more.                                                  |
| [`integrations`](https://developer.vanta.com/reference/listintegrations)                                                | List all connected integrations in your Vanta account. Returns integration id, display name, resource kinds supported by the integration, and how many connections exist for such integration. Use this to see all integrations connected in your Vanta instance.                                                                   |
| [`integrations`](https://developer.vanta.com/reference/getintegration)                                                  | Get integration by ID. Retrieve detailed information about a specific integration when its ID is known. The ID of an integration can be found from integrations response. Returns complete integration details including configuration, resource kinds, and connection status.                                                      |
| [`integration_resources`](https://developer.vanta.com/reference/listresourcekindsummaries)                              | Access integration resources including resource kinds, resource kind details, and specific resources. Specify operation ('list_kinds', 'get_kind_details', 'list_resources', 'get_resource') to perform the desired action. Use this to explore what resources an integration can monitor and access detailed resource information. |
| [`vendor_compliance`](https://developer.vanta.com/reference/listvendordocuments)                                        | Access vendor compliance data including documents, findings, and security reviews. Specify complianceType ('documents', 'findings', 'security_reviews') to get the specific type of compliance information for a vendor. Use this to explore vendor compliance documentation, security findings, and assessment history.            |
| [`get_vendor_security_review`](https://developer.vanta.com/reference/getsecurityreviewsbyid)                            | Get vendor security review by ID. Retrieve detailed information about a specific security review for a vendor. Use this to get complete details about a particular security assessment including findings, status, and recommendations.                                                                                             |
| [`list_vendor_security_review_documents`](https://developer.vanta.com/reference/getsecurityreviewdocuments)             | List vendor security review's documents. Get all documents associated with a specific vendor security review. Use this to access supporting documentation, evidence, and reports related to a security assessment.                                                                                                                  |
| [`documents`](https://developer.vanta.com/reference/listdocuments)                                                      | Access documents in your Vanta account. Provide documentId to get a specific document, or omit to list all documents. Returns document IDs, names, types, and metadata for compliance and evidence management. Use this to see all documents available for compliance frameworks and controls.                                      |
| [`document_resources`](https://developer.vanta.com/reference/listdocumentcontrols)                                      | Access document-related resources including controls, links, and uploads. Specify resourceType ('controls', 'links', 'uploads') to get the specific type of resource associated with a document. Use this to explore what controls are linked to a document, what external references exist, or what files are attached.            |
| [`download_document_file`](https://developer.vanta.com/reference/getdocumentupload)                                     | Download document file by upload ID. Get the actual uploaded document file. Intelligently handles different MIME types: returns text content for readable files, metadata information for binary files. Use this to access compliance evidence and documentation content that can be analyzed.                                      |
| [`policies`](https://developer.vanta.com/reference/listpolicies)                                                        | Access policies in your Vanta account. Provide policyId to get a specific policy, or omit to list all policies. Returns policy IDs, names, and metadata for compliance and governance management. Use this to see all policies available for compliance frameworks and organizational governance.                                   |
| [`list_discovered_vendors`](https://developer.vanta.com/reference/listdiscoveredvendors)                                | List discovered vendors identified by Vanta's automated discovery. Returns vendor names, domains, discovery sources, and linkage status to managed vendor records.                                                                                                                                                                  |
| [`list_discovered_vendor_accounts`](https://developer.vanta.com/reference/listdiscoveredvendoraccounts)                 | List accounts associated with a discovered vendor. Provide discoveredVendorId to retrieve account identifiers, connection details, and discovery metadata.                                                                                                                                                                          |
| [`groups`](https://developer.vanta.com/reference/listgroups)                                                            | List all groups in your Vanta account. Returns group IDs, names, descriptions, and metadata for organizational structure and access management. Use this to see all groups available for people assignment and access control.                                                                                                      |
| [`groups`](https://developer.vanta.com/reference/getgroup)                                                              | Get group by ID. Retrieve detailed information about a specific group when its ID is known. The ID of a group can be found from groups response. Returns complete group details including name, description, member count, and access permissions.                                                                                  |
| [`list_group_people`](https://developer.vanta.com/reference/listgrouppeople)                                            | List people in a group. Get all people who are members of a specific group for organizational structure and access management. Use this to understand group membership and review who has group-based access permissions.                                                                                                           |
| [`people`](https://developer.vanta.com/reference/listpeople)                                                            | List all people in your Vanta account. Returns person IDs, names, email addresses, and metadata for organizational structure and access management. Use this to see all people in your organization for compliance and security management.                                                                                         |
| [`people`](https://developer.vanta.com/reference/getperson)                                                             | Get person by ID. Retrieve detailed information about a specific person when their ID is known. The ID of a person can be found from people response. Returns complete person details including name, email, role, group memberships, and access permissions.                                                                       |
| [`vulnerabilities`](https://developer.vanta.com/reference/listvulnerabilities)                                          | Get vulnerabilities in your Vanta account. Returns vulnerability IDs, CVE information, severity levels, and affected assets for security monitoring and remediation. Use this to see all vulnerabilities detected across your infrastructure and applications.                                                                      |
| [`vulnerabilities`](https://developer.vanta.com/reference/getvulnerability)                                             | Get vulnerability by ID. Retrieve detailed information about a specific vulnerability when its ID is known. The ID of a vulnerability can be found from vulnerabilities response. Returns complete vulnerability details including CVE information, severity, affected assets, and remediation status.                              |
| [`list_vulnerability_remediations`](https://developer.vanta.com/reference/listvulnerabilityremediations)                | List vulnerability remediations in your Vanta account. Returns remediation IDs, associated vulnerabilities, remediation status, and timeline information for security management. Use this to track vulnerability remediation efforts and ensure timely resolution of security issues.                                              |
| [`vulnerable_assets`](https://developer.vanta.com/reference/listvulnerableassets)                                       | List assets associated with vulnerabilities in your Vanta account. Returns asset IDs, vulnerability associations, asset types, and security status for infrastructure security management. Use this to identify which assets are affected by vulnerabilities and prioritize security efforts.                                       |
| [`vulnerable_assets`](https://developer.vanta.com/reference/getvulnerableasset)                                         | Get vulnerable asset by ID. Retrieve detailed information about a specific vulnerable asset when its ID is known. The ID of a vulnerable asset can be found from vulnerable_assets response. Returns complete asset details including vulnerability associations, asset type, and security status.                                  |
| [`monitored_computers`](https://developer.vanta.com/reference/listmonitoredcomputers)                                   | List monitored computers in your Vanta account. Returns computer IDs, hostnames, operating systems, and security status for endpoint security management. Use this to see all computers being monitored for compliance and security across your organization.                                                                       |
| [`monitored_computers`](https://developer.vanta.com/reference/getmonitoredcomputer)                                     | Get monitored computer by ID. Retrieve detailed information about a specific monitored computer when its ID is known. The ID of a computer can be found from monitored_computers response. Returns complete computer details including hostname, OS, security status, and compliance information.                                   |
| [`list_vendor_risk_attributes`](https://developer.vanta.com/reference/listvenderriskattributes)                         | List vendor risk attributes in your Vanta account. Returns risk attribute IDs, names, categories, and assessment criteria for vendor risk management. Use this to understand the available risk attributes for evaluating and categorizing vendor risks across your organization.                                                   |
| [`get_trust_center`](https://developer.vanta.com/reference/gettrustcenter)                                              | Get Trust Center information. Retrieve detailed information about a specific Trust Center including configuration, branding, and public visibility settings. Use this to access Trust Center details for compliance transparency and customer communication.                                                                        |
| [`trust_center_access_requests`](https://developer.vanta.com/reference/listtrustcenteraccessrequests)                   | List Trust Center access requests. Get all pending and processed access requests for a specific Trust Center. Use this to manage and review who is requesting access to your Trust Center content and compliance information.                                                                                                       |
| [`trust_center_access_requests`](https://developer.vanta.com/reference/gettrustcenteraccessrequest)                     | Get Trust Center access request by ID. Retrieve detailed information about a specific access request including requester details, status, and request metadata. Use this to review individual access requests for approval or denial decisions.                                                                                     |
| [`list_trust_center_viewer_activity_events`](https://developer.vanta.com/reference/listtrustcentervieweractivityevents) | List Trust Center viewer activity events. Get all viewer activity and engagement events for a specific Trust Center including page views, document downloads, and user interactions. Use this to track Trust Center usage and engagement analytics.                                                                                 |
| [`trust_center_control_categories`](https://developer.vanta.com/reference/listtrustcentercontrolcategories)             | List Trust Center control categories. Get all control categories configured for a specific Trust Center including category names, descriptions, and organization. Use this to understand how compliance controls are categorized and presented to Trust Center visitors.                                                            |
| [`trust_center_control_categories`](https://developer.vanta.com/reference/gettrustcentercontrolcategory)                | Get Trust Center control category by ID. Retrieve detailed information about a specific control category including its configuration, associated controls, and display settings. Use this to access specific control category details for Trust Center management.                                                                  |
| [`trust_center_controls`](https://developer.vanta.com/reference/listtrustcentercontrols)                                | List Trust Center controls. Get all compliance controls published in a specific Trust Center including control descriptions, implementation status, and evidence. Use this to see which controls are publicly visible to Trust Center visitors.                                                                                     |
| [`trust_center_controls`](https://developer.vanta.com/reference/gettrustcentercontrol)                                  | Get Trust Center control by ID. Retrieve detailed information about a specific control published in the Trust Center including implementation details, evidence, and compliance status. Use this to access individual control information for Trust Center transparency.                                                            |
| [`trust_center_faqs`](https://developer.vanta.com/reference/listtrustcenterfaqs)                                        | List Trust Center FAQs. Get all frequently asked questions configured for a specific Trust Center including questions, answers, and organization. Use this to see what information is provided to Trust Center visitors through the FAQ section.                                                                                    |
| [`trust_center_faqs`](https://developer.vanta.com/reference/gettrustcenterfaq)                                          | Get Trust Center FAQ by ID. Retrieve detailed information about a specific FAQ including the question, answer, and display settings. Use this to access individual FAQ content for Trust Center management and customer communication.                                                                                              |
| [`list_trust_center_resources`](https://developer.vanta.com/reference/listtrustcenterresources)                         | List Trust Center resources. Get all resources and documents available in a specific Trust Center including compliance documents, certifications, and downloadable materials. Use this to see what resources are publicly available to Trust Center visitors.                                                                       |
| [`get_trust_center_document`](https://developer.vanta.com/reference/gettrustcenterdocument)                             | Get Trust Center document by ID. Retrieve detailed information about a specific document published in the Trust Center including metadata, content, and access settings. Use this to access individual document details for Trust Center content management.                                                                        |

## Configuration

### Vanta OAuth Credentials

1. Create OAuth credentials from [Vanta's developer dashboard](https://developer.vanta.com/docs/api-access-setup)
2. Save the `client_id` and `client_secret` to an env file:
   ```json
   {
     "client_id": "your_client_id_here",
     "client_secret": "your_client_secret_here"
   }
   ```

> **Note:** Vanta currently allows only a single active access_token per Application. [More info here](https://developer.vanta.com/docs/api-access-setup#authentication-and-token-retrieval)

### Usage with Claude Desktop

Add the server to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vanta": {
      "command": "npx",
      "args": ["-y", "@vantasdk/vanta-mcp-server"],
      "env": {
        "VANTA_ENV_FILE": "/absolute/path/to/your/vanta-credentials.env"
      }
    }
  }
}
```

If you are unfamiliar with setting up MCP servers in Claude Desktop, [here is an example](https://modelcontextprotocol.io/quickstart/user) in the official MCP documentation.

### Usage with Cursor

Add the server to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "Vanta": {
      "command": "npx",
      "args": ["-y", "@vantasdk/vanta-mcp-server"],
      "env": {
        "VANTA_ENV_FILE": "/absolute/path/to/your/vanta-credentials.env"
      }
    }
  }
}
```

### Environment Variables

- `VANTA_ENV_FILE` (required): Absolute path to the JSON file containing your OAuth credentials
- `REGION` (optional): API region - `us`, `eu`, or `aus` (defaults to `us`)

## Installation

### NPX (Recommended)

```bash
npx @vantasdk/vanta-mcp-server
```

### Global Installation

```bash
npm install -g @vantasdk/vanta-mcp-server
vanta-mcp-server
```

### From Source

```bash
git clone https://github.com/VantaInc/vanta-mcp-server.git
cd vanta-mcp-server
npm install
npm run build
npm start
```

## Build from Source

To build from source:

```bash
npm run build
```

This will:

1. Compile TypeScript to JavaScript
2. Make the output executable
3. Place built files in the `build/` directory

Now you can configure Claude Desktop or Cursor to use the built executable:

```json
{
  "mcpServers": {
    "Vanta": {
      "command": "node",
      "args": ["/absolute/path/to/vanta-mcp-server/build/index.js"],
      "env": {
        "VANTA_ENV_FILE": "/absolute/path/to/your/vanta-credentials.env"
      }
    }
  }
}
```

## Development

This server is built with TypeScript and includes the following development tools:

- **TypeScript**: For type safety and better development experience
- **ESLint**: For code quality and consistency
- **Automated Tool Registry**: Zero-maintenance tool registration system
- **DRY Utilities**: Centralized utilities to reduce code duplication

### Project Structure

```
vanta-mcp-server/
├── src/
│   ├── operations/              # MCP tool implementations
│   │   ├── index.ts            # Barrel export for all operations
│   │   ├── common/             # Shared utilities and infrastructure
│   │   │   ├── descriptions.ts # Centralized parameter descriptions
│   │   │   ├── imports.ts      # Common imports barrel for operations
│   │   │   └── utils.ts        # DRY utilities and request handlers
│   │   ├── controls.ts         # Control-related operations
│   │   ├── vendors.ts          # Vendor-related operations
│   │   ├── people.ts           # People-related operations
│   │   ├── documents.ts        # Document-related operations
│   │   ├── frameworks.ts       # Framework-related operations
│   │   ├── risks.ts            # Risk scenario operations
│   │   ├── tests.ts            # Test-related operations
│   │   ├── integrations.ts     # Integration-related operations (consolidated)
│   │   ├── discovered-vendors.ts # Discovery operations (consolidated)
│   │   ├── trust-centers.ts    # Trust Center operations
│   │   └── ...                 # Other resource operations (18 total)
│   ├── eval/                   # Evaluation and testing framework
│   │   ├── eval.ts            # LLM evaluation test cases
│   │   └── README.md          # Evaluation documentation
│   ├── api.ts                  # Base API configuration
│   ├── auth.ts                 # Authentication handling
│   ├── index.ts                # Main server entry point
│   ├── registry.ts             # Automated tool registration
│   └── types.ts                # Type definitions
├── build/                      # Compiled JavaScript output
└── README.md                   # This file
```

### Architecture Highlights

- **Consolidated Tool Pattern**: Single tools intelligently handle both list and get operations with optional ID parameters
- **Reduced Complexity**: 43 tools (down from 53) through smart consolidation while maintaining full functionality
- **Clean Organization**: Operations files are cleanly separated from infrastructure code
- **Common Subdirectory**: All shared utilities, imports, and descriptions are organized in `operations/common/`
- **Automated Registry**: New tools are automatically discovered and registered without manual configuration
- **DRY Principles**: Extensive code reuse through centralized utilities and schema factories
- **Type Safety**: Full TypeScript coverage with comprehensive type definitions

### Intelligent Tool Consolidation

The Vanta MCP Server implements a **consolidated tool architecture** where many tools can handle both list and get operations:

**Before (53 tools):**

- `list_document_controls`, `list_document_links`, `list_document_uploads` (3 separate tools)
- `list_integration_resource_kinds`, `get_integration_resource_kind_details`, `list_integration_resources`, `get_integration_resource` (4 separate tools)
- `list_vendor_documents`, `list_vendor_findings`, `list_vendor_security_reviews` (3 separate tools)

**After (43 tools):**

- `document_resources` (consolidates 3 operations with `resourceType` parameter)
- `integration_resources` (consolidates 4 operations with `operation` parameter)
- `vendor_compliance` (consolidates 3 operations with `complianceType` parameter)

**Benefits:**

- ✅ **Fewer Tools**: 19% reduction while maintaining all functionality
- ✅ **Clearer Intent**: Tools match natural language patterns better
- ✅ **Preserved Usability**: All original capabilities maintained
- ✅ **Intelligent Routing**: Single tool automatically routes to appropriate endpoints

For detailed architecture documentation, see [`src/operations/README.md`](src/operations/README.md).

## Debugging

You can use the MCP Inspector to debug the server:

```bash
npx @modelcontextprotocol/inspector npx @vantasdk/vanta-mcp-server
```

The inspector will open in your browser, allowing you to test tool calls and inspect the server's behavior.

## Example Usage

### Get failing AWS tests for SOC2

```typescript
{
  "tool": "list_tests",
  "arguments": {
    "statusFilter": "NEEDS_ATTENTION",
    "integrationFilter": "aws",
    "frameworkFilter": "soc2",
    "pageSize": 50
  }
}
```

## License

This project is licensed under the terms of the MIT open source license. Please refer to [LICENSE](LICENSE) file for details.
