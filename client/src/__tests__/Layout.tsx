import React from 'react'
import { screen } from '@testing-library/react';
import { AUTH_TOKEN, Paths } from 'app/const';
import Layout from '../Layout';
import { renderComponent } from '@test-utils/Render'

describe('Layout component', () => {
  beforeEach(() => {
    renderComponent(<Layout />, { path: Paths.Home })
  })
  describe('logged in user', () => {
    beforeEach(() => {
      const token = 'abc123'
      localStorage.setItem(AUTH_TOKEN, token)
    })

    it('should store the authentication token', async () => {
      const logoutButton = screen.getByText('Logout')
      expect(logoutButton).toBeInTheDocument()
    })
  })
  describe('logged out user', () => {
    beforeEach(() => {
      localStorage.removeItem(AUTH_TOKEN)
    })
    it('should store the authentication token', async () => {
      const logoutButton = screen.queryByText('Logout')
      expect(logoutButton).toBeNull()
    })
  })
})
