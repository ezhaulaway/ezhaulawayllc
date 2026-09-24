import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  phone?: string
  description?: string
  photoCount?: number
  priceRange?: string
  loadSize?: string
  itemsIdentified?: string
  summary?: string
  submittedAt?: string
}

const Email = ({
  name,
  phone,
  description,
  photoCount,
  priceRange,
  loadSize,
  itemsIdentified,
  summary,
  submittedAt,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New AI estimate lead from ${name || 'a customer'}${priceRange ? ` — ${priceRange}` : ''}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>EZ HAULAWAY LLC</Text>
        <Heading style={heading}>New instant estimate lead</Heading>
        <Text style={muted}>{submittedAt ? `Submitted ${submittedAt}` : 'Just submitted'}</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>
            {phone ? <Link href={`tel:${phone}`} style={link}>{phone}</Link> : '—'}
          </Text>
          <Text style={label}>Estimate shown to them</Text>
          <Text style={price}>{priceRange || '—'}</Text>
          <Text style={label}>Load size</Text>
          <Text style={value}>{loadSize || '—'}</Text>
          <Text style={label}>What they described</Text>
          <Text style={value}>{description || '—'}</Text>
          <Text style={label}>Photos uploaded</Text>
          <Text style={value}>{photoCount ? `${photoCount} photo(s)` : 'None'}</Text>
          <Text style={label}>Items spotted</Text>
          <Text style={value}>{itemsIdentified || '—'}</Text>
          <Text style={label}>Estimate summary</Text>
          <Text style={value}>{summary || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={muted}>
          Call or text them back fast — most customers book with whoever reaches out first.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New instant estimate — ${data['name'] || 'Website'}${data['priceRange'] ? ` (${data['priceRange']})` : ''}`,
  displayName: 'New AI estimate lead (internal alert)',
  to: 'ben@ezhaulawayllc.com',
  previewData: {
    name: 'Jordan Miller',
    phone: '720-555-0134',
    description: 'Old couch, two mattresses and about 15 boxes in the garage.',
    photoCount: 2,
    priceRange: '$400–$500',
    loadSize: 'About 1/2 trailer',
    itemsIdentified: 'Couch, 2 mattresses, 15 boxes',
    summary: 'Looks like about half a trailer of household items with easy driveway access.',
    submittedAt: 'Sep 24, 2026, 3:02 PM',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const brand = {
  fontSize: '12px',
  letterSpacing: '2px',
  fontWeight: 700,
  color: '#b91c1c',
  margin: '0 0 6px',
}
const heading = { fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }
const muted = { fontSize: '13px', color: '#6b7280', margin: '0' }
const hr = { borderColor: '#e5e7eb', margin: '18px 0' }
const label = {
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  color: '#6b7280',
  fontWeight: 700,
  margin: '14px 0 2px',
}
const value = { fontSize: '15px', color: '#111827', margin: '0', lineHeight: '22px' }
const price = { fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0' }
const link = { color: '#b91c1c', fontWeight: 700 }
