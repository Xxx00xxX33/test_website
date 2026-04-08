import * as React from 'react';
import { useIntl } from 'react-intl';

type IntlMessage = {
  id?: string;
  defaultMessage?: string;
  values?: Record<string, unknown>;
};

type InputProps = {
  attribute: {
    type: string;
  };
  description?: IntlMessage;
  disabled?: boolean;
  error?: IntlMessage | string;
  intlLabel: IntlMessage;
  name: string;
  onChange: (event: { target: { name: string; type: string; value: string } }) => void;
  placeholder?: IntlMessage;
  required?: boolean;
  value?: string | null;
};

type MessageDescriptor = {
  id: string;
  defaultMessage: string;
  values?: Record<string, unknown>;
};

const DEFAULT_COLOR = '#ee7a1b';
const FIELD_LABEL_MESSAGES: Record<string, MessageDescriptor> = {
  primaryColor: {
    id: 'themePalette.field.primaryColor.label',
    defaultMessage: 'Primary color',
  },
  warmColor: {
    id: 'themePalette.field.warmColor.label',
    defaultMessage: 'Warm background',
  },
  accentColor: {
    id: 'themePalette.field.accentColor.label',
    defaultMessage: 'Accent color',
  },
};
const FIELD_HELPER_MESSAGES: Record<string, MessageDescriptor> = {
  primaryColor: {
    id: 'themePalette.field.primaryColor.description',
    defaultMessage: 'Used for buttons, links, headings, and other primary brand accents.',
  },
  warmColor: {
    id: 'themePalette.field.warmColor.description',
    defaultMessage: 'Used for light backgrounds, soft cards, and warm atmosphere sections.',
  },
  accentColor: {
    id: 'themePalette.field.accentColor.description',
    defaultMessage: 'Used for highlighted information, accent details, and supporting emphasis.',
  },
};
const UI_MESSAGES = {
  required: {
    id: 'themePalette.input.required',
    defaultMessage: 'This color field cannot be empty.',
  },
  invalidHex: {
    id: 'themePalette.input.invalidHex',
    defaultMessage: 'Please enter a valid HEX color, such as #ee7a1b.',
  },
  currentValue: {
    id: 'themePalette.input.currentValue',
    defaultMessage: 'Current value',
  },
  supportedFormat: {
    id: 'themePalette.input.supportedFormat',
    defaultMessage: 'Supports 3-digit or 6-digit HEX values',
  },
  colorPanelAria: {
    id: 'themePalette.input.colorPanelAria',
    defaultMessage: '{label} color panel',
  },
} satisfies Record<string, MessageDescriptor>;

function normalizeHexColor(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) {
    return null;
  }

  if (trimmed.length === 4) {
    return `#${trimmed
      .slice(1)
      .split('')
      .map((char) => `${char}${char}`)
      .join('')}`.toLowerCase();
  }

  return trimmed.toLowerCase();
}

function getFieldKey(name: string) {
  const segments = name.split('.');
  return segments[segments.length - 1] || name;
}

function getMessageText(
  formatMessage: ReturnType<typeof useIntl>['formatMessage'],
  message?: IntlMessage | string,
  fallback = '',
) {
  if (!message) {
    return fallback;
  }

  if (typeof message === 'string') {
    return message;
  }

  if (message.id) {
    return formatMessage(
      {
        id: message.id,
        defaultMessage: message.defaultMessage,
      },
      message.values,
    );
  }

  return message.defaultMessage || fallback;
}

const ColorFieldInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    attribute,
    description,
    disabled,
    error,
    intlLabel,
    name,
    onChange,
    placeholder,
    required,
    value,
  } = props;
  const { formatMessage } = useIntl();
  const [draft, setDraft] = React.useState(value ?? '');
  const [validationMessage, setValidationMessage] = React.useState('');

  React.useEffect(() => {
    setDraft(value ?? '');
  }, [value]);

  const fieldKey = getFieldKey(name);
  const localizedFieldLabel = getMessageText(
    formatMessage,
    FIELD_LABEL_MESSAGES[fieldKey],
    fieldKey,
  );
  const localizedFieldHelper = getMessageText(
    formatMessage,
    FIELD_HELPER_MESSAGES[fieldKey],
    '',
  );
  const helperText = getMessageText(formatMessage, description, localizedFieldHelper);
  const label = getMessageText(formatMessage, intlLabel, localizedFieldLabel);
  const placeholderText = getMessageText(formatMessage, placeholder, '#ee7a1b');
  const normalizedColor = normalizeHexColor(draft) || normalizeHexColor(value) || DEFAULT_COLOR;
  const errorText = validationMessage || getMessageText(formatMessage, error);
  const requiredMessage = getMessageText(formatMessage, UI_MESSAGES.required);
  const invalidHexMessage = getMessageText(formatMessage, UI_MESSAGES.invalidHex);
  const currentValueLabel = getMessageText(formatMessage, UI_MESSAGES.currentValue);
  const supportedFormatLabel = getMessageText(formatMessage, UI_MESSAGES.supportedFormat);
  const colorPanelLabel = getMessageText(
    formatMessage,
    {
      ...UI_MESSAGES.colorPanelAria,
      values: { label },
    },
    `${label} color panel`,
  );

  const commitValue = (nextValue: string) => {
    onChange({
      target: {
        name,
        type: attribute.type,
        value: nextValue,
      },
    });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value.toLowerCase();
    setDraft(nextValue);
    setValidationMessage('');
    commitValue(nextValue);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    setDraft(nextValue);

    const normalized = normalizeHexColor(nextValue);
    if (normalized) {
      setValidationMessage('');
      commitValue(normalized);
      return;
    }

    if (nextValue.trim() === '') {
      setValidationMessage(required ? requiredMessage : '');
      if (!required) {
        commitValue('');
      }
      return;
    }

    setValidationMessage(invalidHexMessage);
  };

  const handleTextBlur = () => {
    const normalized = normalizeHexColor(draft);
    if (normalized) {
      setDraft(normalized);
      setValidationMessage('');
      commitValue(normalized);
      return;
    }

    if (!draft.trim() && !required) {
      setValidationMessage('');
      return;
    }

    const fallbackValue = value ?? '';
    setDraft(fallbackValue);
    if (!normalizeHexColor(draft)) {
      setValidationMessage(invalidHexMessage);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <label htmlFor={`${name}-hex`} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#32324d' }}>
        {label}
        {required ? <span style={{ color: '#d02b20' }}> *</span> : null}
      </label>

      {helperText ? (
        <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.5, color: '#666687' }}>{helperText}</p>
      ) : null}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto minmax(0, 1fr)',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <input
          type="color"
          value={normalizedColor}
          disabled={disabled}
          aria-label={colorPanelLabel}
          onChange={handleColorChange}
          style={{
            width: '3rem',
            height: '3rem',
            border: '1px solid #dcdce4',
            borderRadius: '0.75rem',
            padding: '0.25rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: '#ffffff',
          }}
        />

        <div
          aria-hidden="true"
          style={{
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '999px',
            border: '1px solid rgba(50, 50, 77, 0.12)',
            background: normalizedColor,
            boxShadow: '0 8px 20px rgba(15, 15, 15, 0.08)',
          }}
        />

        <input
          ref={ref}
          id={`${name}-hex`}
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          value={draft}
          placeholder={placeholderText}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          style={{
            minHeight: '2.75rem',
            width: '100%',
            border: `1px solid ${errorText ? '#d02b20' : '#dcdce4'}`,
            borderRadius: '0.75rem',
            padding: '0.75rem 0.875rem',
            fontSize: '0.9375rem',
            color: '#32324d',
            backgroundColor: disabled ? '#f6f6f9' : '#ffffff',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem' }}>
        <span style={{ color: '#666687' }}>{currentValueLabel}: {normalizedColor}</span>
        <span style={{ color: '#666687' }}>{supportedFormatLabel}</span>
      </div>

      {errorText ? <p style={{ margin: 0, fontSize: '0.8125rem', color: '#d02b20' }}>{errorText}</p> : null}
    </div>
  );
});

ColorFieldInput.displayName = 'ColorFieldInput';

export default ColorFieldInput;
