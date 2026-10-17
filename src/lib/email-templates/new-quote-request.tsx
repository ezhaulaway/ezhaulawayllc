import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  phone?: string
  location?: string
  details?: string
  photoCount?: number
  photoUrls?: string[]
  submittedAt?: string
}

const Email = ({ name, phone, location, details, photoCount, photoUrls, submittedAt }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New quote request from ${name || 'a customer'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>EZ HAULAWAY LLC</Text>
        <Heading style={heading}>New quote request</Heading>
        <Text style={muted}>{submittedAt ? `Submitted ${submittedAt}` : 'Just submitted'}</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Location</Text>
          <Text style={value}>{location || '—'}</Text>
          <Text style={label}>What they need hauled</Text>
          <Text style={value}>{details || '—'}</Text>
          <Text style={label}>Photos attached to the request</Text>
          <Text style={value}>{photoCount ? `${photoCount} photo(s)` : 'None'}</Text>
          {(photoUrls ?? []).map((url, i) => (
            <Text key={url} style={value}>
              <Link href={url} style={link}>{`View photo ${i + 1}`}</Link>
            </Text>
          ))}
          {photoUrls && photoUrls.length > 0 ? (
            <Text style={muted}>Photo links work for 14 days.</Text>
          ) : null}
        </Section>
        <Hr style={hr} />
        <Text style={muted}>
          Reply fast — most customers book with whoever calls back first.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New quote request — ${data['name'] || 'Website'}${data['location'] ? ` (${data['location']})` : ''}`,
  displayName: 'New quote request (internal alert)',
  to: 'ben@ezhaulawayllc.com',
  previewData: {
    name: 'Jane Smith',
    phone: '720-555-0148',
    location: '80134',
    details: 'Old couch, mattress, and about 10 boxes in the garage.',
    photoCount: 2,
    submittedAt: 'Mon, Sep 14, 2026, 10:45 AM MT',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const brand = {
  fontSize: '12px',
  letterSpacing: '2px',
  color: '#b91c1c',
  fontWeight: 'bold' as const,
  margin: '0 0 4px',
}
const heading = { fontSize: '24px', color: '#111111', margin: '0 0 4px' }
const muted = { fontSize: '13px', color: '#6b7280', margin: '0' }
const hr = { borderColor: '#e5e7eb', margin: '18px 0' }
const label = {
  fontSize: '11px',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  color: '#6b7280',
  margin: '12px 0 2px',
}
const value = { fontSize: '15px', color: '#111111', margin: '0', lineHeight: '22px' }
