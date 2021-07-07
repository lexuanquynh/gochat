// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// Message message
//
// swagger:model message
type Message struct {

	// author id
	// Format: uuid
	AuthorID strfmt.UUID `json:"author_id,omitempty"`

	// author name
	// Example: John Smith
	AuthorName string `json:"author_name,omitempty"`

	// conversation id
	// Format: uuid
	ConversationID strfmt.UUID `json:"conversation_id,omitempty"`

	// created at
	// Format: date-time
	CreatedAt strfmt.DateTime `json:"created_at,omitempty"`

	// id
	// Format: uuid
	ID strfmt.UUID `json:"id,omitempty"`

	// message
	Message string `json:"message,omitempty"`
}

// Validate validates this message
func (m *Message) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateAuthorID(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateConversationID(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateCreatedAt(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateID(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *Message) validateAuthorID(formats strfmt.Registry) error {
	if swag.IsZero(m.AuthorID) { // not required
		return nil
	}

	if err := validate.FormatOf("author_id", "body", "uuid", m.AuthorID.String(), formats); err != nil {
		return err
	}

	return nil
}

func (m *Message) validateConversationID(formats strfmt.Registry) error {
	if swag.IsZero(m.ConversationID) { // not required
		return nil
	}

	if err := validate.FormatOf("conversation_id", "body", "uuid", m.ConversationID.String(), formats); err != nil {
		return err
	}

	return nil
}

func (m *Message) validateCreatedAt(formats strfmt.Registry) error {
	if swag.IsZero(m.CreatedAt) { // not required
		return nil
	}

	if err := validate.FormatOf("created_at", "body", "date-time", m.CreatedAt.String(), formats); err != nil {
		return err
	}

	return nil
}

func (m *Message) validateID(formats strfmt.Registry) error {
	if swag.IsZero(m.ID) { // not required
		return nil
	}

	if err := validate.FormatOf("id", "body", "uuid", m.ID.String(), formats); err != nil {
		return err
	}

	return nil
}

// ContextValidate validates this message based on context it is used
func (m *Message) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *Message) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *Message) UnmarshalBinary(b []byte) error {
	var res Message
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
