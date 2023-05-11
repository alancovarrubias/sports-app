import React from 'react'
import { screen } from '@testing-library/react';
import { AUTH_TOKEN, Paths } from 'app/const';
import Layout from '../Layout';
import { renderComponent } from '@test-utils/Render'

describe('Layout component', () => {
  describe('logged in user', () => {
    beforeEach(() => {
      const token = 'abc123'
      localStorage.setItem(AUTH_TOKEN, token)
      renderComponent(<Layout />, { path: Paths.Home })
    })

    it('should show a logout button', async () => {
      const logoutButton = screen.getByText('Logout')
      expect(logoutButton).toBeInTheDocument()
    })
  })
  describe('logged out user', () => {
    beforeEach(() => {
      localStorage.removeItem(AUTH_TOKEN)
      renderComponent(<Layout />, { path: Paths.Home })
    })

    it('should not show a logout button', async () => {
      const logoutButton = screen.queryByText('Logout')
      expect(logoutButton).toBeNull()
    })
  })
})
