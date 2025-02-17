import React, { useState } from 'react';

interface Field {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  required?: boolean;
  category: 'order' | 'inventory' | 'product' | 'customer' | 'shipping';
}

interface APIConfigurationFormProps {
  onSave?: (config: Config) => void;
}

interface Config {
  apiUrl: string;
  authType: 'token' | 'basic';
  token: string;
  username: string;
  password: string;
  selectedFields: string[];
  fieldMappings: Record<string, string>;
  customFields: Array<{ name: string; value: string }>;
}

interface TestStatus {
  status: '' | 'success' | 'error';
  message: string;
}

const VendorAPIConfigComponent: React.FC<APIConfigurationFormProps> = ({
  onSave,
}) => {
  const [config, setConfig] = useState<Config>({
    apiUrl: '',
    authType: 'token',
    token: '',
    username: '',
    password: '',
    selectedFields: [],
    fieldMappings: {},
    customFields: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Config, string>>>(
    {},
  );
  const [testStatus, setTestStatus] = useState<TestStatus>({
    status: '',
    message: '',
  });

  const availableFields: Field[] = [
    { key: 'order_id', label: 'Order ID', type: 'string', category: 'order' },
    {
      key: 'customer_name',
      label: 'Customer Name',
      type: 'string',
      category: 'customer',
    },
    {
      key: 'customer_email',
      label: 'Customer Email',
      type: 'string',
      category: 'customer',
    },
    {
      key: 'shipping_address',
      label: 'Shipping Address',
      type: 'string',
      category: 'shipping',
    },
    {
      key: 'order_total',
      label: 'Order Total',
      type: 'number',
      category: 'order',
    },
    {
      key: 'payment_status',
      label: 'Payment Status',
      type: 'string',
      category: 'order',
    },
    {
      key: 'shipping_method',
      label: 'Shipping Method',
      type: 'string',
      category: 'shipping',
    },

    {
      key: 'product_id',
      label: 'Product ID',
      type: 'string',
      category: 'product',
    },
    {
      key: 'product_name',
      label: 'Product Name',
      type: 'string',
      category: 'product',
    },
    {
      key: 'quantity',
      label: 'Quantity',
      type: 'number',
      category: 'inventory',
    },
    { key: 'price', label: 'Price', type: 'number', category: 'product' },
    { key: 'sku', label: 'SKU', type: 'string', category: 'product' },

    {
      key: 'stock_level',
      label: 'Stock Level',
      type: 'number',
      category: 'inventory',
    },
    {
      key: 'warehouse_location',
      label: 'Warehouse Location',
      type: 'string',
      category: 'inventory',
    },

    {
      key: 'tracking_number',
      label: 'Tracking Number',
      type: 'string',
      category: 'shipping',
    },
    {
      key: 'estimated_delivery_date',
      label: 'Estimated Delivery Date',
      type: 'date',
      category: 'shipping',
    },
  ];

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof Config]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'apiUrl') {
      if (!validateUrl(value)) {
        setErrors(prev => ({ ...prev, [name]: 'Please enter a valid URL' }));
      } else {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleAuthTypeChange = (type: 'token' | 'basic') => {
    setConfig(prev => ({ ...prev, authType: type }));
    setErrors(prev => ({ ...prev, token: '', username: '', password: '' }));
  };

  const handleFieldToggle = (fieldKey: string) => {
    setConfig(prev => {
      const newSelectedFields = prev.selectedFields.includes(fieldKey)
        ? prev.selectedFields.filter(f => f !== fieldKey)
        : [...prev.selectedFields, fieldKey];

      const newFieldMappings = { ...prev.fieldMappings };
      if (!newSelectedFields.includes(fieldKey)) {
        delete newFieldMappings[`${fieldKey}`];
      } else if (!newFieldMappings[`${fieldKey}`]) {
        newFieldMappings[`${fieldKey}`] = fieldKey;
      }

      return {
        ...prev,
        selectedFields: newSelectedFields,
        fieldMappings: newFieldMappings,
      };
    });
  };

  const handleFieldMapping = (fieldKey: string, mappedName: string) => {
    setConfig(prev => ({
      ...prev,
      fieldMappings: {
        ...prev.fieldMappings,
        [fieldKey]: mappedName,
      },
    }));
  };

  const handleAddCustomField = () => {
    setConfig(prev => ({
      ...prev,
      customFields: [...prev.customFields, { name: '', value: '' }],
    }));
  };

  const handleCustomFieldChange = (
    index: number,
    field: 'name' | 'value',
    value: string,
  ) => {
    setConfig(prev => {
      const newCustomFields = [...prev.customFields];
      newCustomFields[`${index}`] = {
        ...newCustomFields[`${index}`],
        [field]: value,
      };
      return { ...prev, customFields: newCustomFields };
    });
  };

  const handleRemoveCustomField = (index: number) => {
    setConfig(prev => {
      const newCustomFields = [...prev.customFields];
      newCustomFields.splice(index, 1);
      return { ...prev, customFields: newCustomFields };
    });
  };

  const validateConfig = (): boolean => {
    const newErrors: Partial<Record<keyof Config, string>> = {};

    if (!config.apiUrl) {
      newErrors.apiUrl = 'API URL is required';
    } else if (!validateUrl(config.apiUrl)) {
      newErrors.apiUrl = 'Please enter a valid URL';
    }

    if (config.authType === 'token' && !config.token) {
      newErrors.token = 'Token is required for token authentication';
    }

    if (config.authType === 'basic') {
      if (!config.username) {
        newErrors.username = 'Username is required for basic authentication';
      }
      if (!config.password) {
        newErrors.password = 'Password is required for basic authentication';
      }
    }
    if (config.selectedFields.length === 0) {
      newErrors.selectedFields = 'Please select at least one field';
    }
    const requiredFields = availableFields.filter(field => field.required);
    for (const field of requiredFields) {
      if (!config.selectedFields.includes(field.key)) {
        newErrors.selectedFields = `${field.label} is a required field`;
        break;
      }
    }
    const emailFields = ['customer_email'];
    for (const field of emailFields) {
      if (
        config.selectedFields.includes(field) &&
        config.fieldMappings[`${field}`]
      ) {
        if (!validateEmail(config.fieldMappings[`${field}`])) {
          newErrors.fieldMappings = `${field} must be a valid email address`;
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateConfig()) {
      try {
        const response = await fetch('/api/vendor-config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
        });

        if (!response.ok) {
          throw new Error('Failed to save configuration');
        }
        // const data = await response.json();
        if (onSave) {
          onSave(config);
        }
        setTestStatus({
          status: 'success',
          message: 'Configuration saved successfully!',
        });
      } catch (error) {
        console.error(error);
        setTestStatus({
          status: 'error',
          message: 'Failed to save configuration. Please try again.',
        });
      }
    } else {
      setTestStatus({
        status: 'error',
        message: 'Please correct the errors before saving.',
      });
    }
  };
  const testConnection = async () => {
    if (!validateConfig()) {
      setTestStatus({
        status: 'error',
        message: 'Please correct the errors before testing the connection.',
      });
      return;
    }
    const { apiUrl, authType, token, username, password } = config;
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (authType === 'token' && token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (authType === 'basic' && username && password) {
        headers['Authorization'] = `Basic ${btoa(`${username}:${password}`)}`;
      } else {
        console.error('Invalid authentication configuration.');
        return;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
      });
      if (!response.ok) {
        throw new Error('Connection test failed');
      }
      const data = await response.json();
      setTestStatus({
        status: 'success',
        message: `Connection successful! API Version: ${data.apiVersion}`,
      });
    } catch (error) {
      setTestStatus({
        status: 'error',
        message: 'Connection failed: ' + (error as Error).message,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg border-4 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="mb-4 text-2xl font-semibold">
          Vendor API Configuration
        </h3>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="apiUrl">
            Vendor API Endpoint URL
          </label>
          <input
            id="apiUrl"
            name="apiUrl"
            type="url"
            className={`w-full rounded-md border px-3 py-2 ${errors.apiUrl ? 'border-red-500' : ''}`}
            placeholder="https://api.vendor.com/endpoint"
            value={config.apiUrl}
            onChange={handleInputChange}
          />
          {errors.apiUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.apiUrl}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Authentication Method
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                checked={config.authType === 'token'}
                onChange={() => handleAuthTypeChange('token')}
              />
              Token Authentication
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                checked={config.authType === 'basic'}
                onChange={() => handleAuthTypeChange('basic')}
              />
              Basic Authentication
            </label>
          </div>
        </div>

        {config.authType === 'token' ? (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium" htmlFor="token">
              Authentication Token
            </label>
            <input
              id="token"
              name="token"
              type="password"
              className={`w-full rounded-md border px-3 py-2 ${errors.token ? 'border-red-500' : ''}`}
              value={config.token}
              onChange={handleInputChange}
            />
            {errors.token && (
              <p className="mt-1 text-sm text-red-500">{errors.token}</p>
            )}
          </div>
        ) : (
          <div className="mb-4 space-y-4">
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className={`w-full rounded-md border px-3 py-2 ${errors.username ? 'border-red-500' : ''}`}
                value={config.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`w-full rounded-md border px-3 py-2 ${errors.password ? 'border-red-500' : ''}`}
                value={config.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Select Fields for Vendor API Payload
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(
              availableFields.reduce(
                (acc, field) => {
                  if (!acc[field.category]) acc[field.category] = [];
                  acc[field.category].push(field);
                  return acc;
                },
                {} as Record<string, Field[]>,
              ),
            ).map(([category, fields]) => (
              <div key={category} className="mb-4">
                <h4 className="mb-2 font-medium capitalize">
                  {category} Information
                </h4>
                {fields.map(field => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={field.key}
                      checked={config.selectedFields.includes(field.key)}
                      onChange={() => handleFieldToggle(field.key)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200/50"
                    />
                    <label htmlFor={field.key} className="text-sm">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {errors.selectedFields && (
            <p className="mt-1 text-sm text-red-500">{errors.selectedFields}</p>
          )}
        </div>

        {config.selectedFields.length > 0 && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Field Mappings
            </label>
            <p className="mb-2 text-sm text-gray-600">
              Map your internal field names to the vendor&apos;s API field names
            </p>
            {config.selectedFields.map(fieldKey => (
              <div key={fieldKey} className="mb-2 flex items-center space-x-2">
                <span className="w-1/3 text-sm font-medium">{fieldKey}:</span>
                <input
                  type="text"
                  value={config.fieldMappings[`${fieldKey}`] || ''}
                  onChange={e => handleFieldMapping(fieldKey, e.target.value)}
                  className="flex-1 rounded-md border px-3 py-2"
                  placeholder={`Vendor's field name for ${fieldKey}`}
                />
              </div>
            ))}
            {errors.fieldMappings && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fieldMappings}
              </p>
            )}
          </div>
        )}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Add Custom Fields
          </label>
          <p className="mb-2 text-sm text-gray-600">
            Add any additional fields required by the vendor&apos;s API
          </p>
          <button
            type="button"
            onClick={handleAddCustomField}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add Custom Field
          </button>
        </div>

        {config.customFields.map((field, index) => (
          <div key={index} className="mb-4 flex space-x-4">
            <input
              type="text"
              placeholder="Field Name"
              value={field.name}
              onChange={e =>
                handleCustomFieldChange(index, 'name', e.target.value)
              }
              className="w-1/2 rounded-md border px-3 py-2"
            />
            <input
              type="text"
              placeholder="Field Value"
              value={field.value}
              onChange={e =>
                handleCustomFieldChange(index, 'value', e.target.value)
              }
              className="w-1/2 rounded-md border px-3 py-2"
            />
            <button
              type="button"
              className="rounded-md border-2 bg-deep-sapphire px-3 py-2 text-white hover:bg-white hover:text-deep-sapphire"
              onClick={() => handleRemoveCustomField(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            onClick={testConnection}
            className="flex-1 rounded-md border-2 py-2"
          >
            Test Connection
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-md bg-deep-sapphire py-2 text-white"
          >
            Save Configuration
          </button>
        </div>

        {testStatus.message && (
          <div
            className={`mt-4 text-sm ${testStatus.status === 'success' ? 'text-green-600' : 'text-red-600'}`}
          >
            {testStatus.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorAPIConfigComponent;
