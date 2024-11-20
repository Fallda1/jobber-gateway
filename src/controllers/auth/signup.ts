import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignUp {
  public async create(req: Request, res: Response): Promise<void> {
    // Log the incoming request body to check what data is received
    console.log('Received request in SignUp controller:', req.body);

    try {
      const response: AxiosResponse = await authService.signUp(req.body);

      // Log the response from the auth service to check the returned data
      console.log('Response from authService.signUp:', response.data);

      req.session = { jwt: response.data.token };
      res.status(StatusCodes.CREATED).json({
        message: response.data.message,
        user: response.data.user
      });
    } catch (error) {
      // Log any errors that occur during the signup process
      console.error('Error in SignUp controller:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Signup failed' });
    }
  }
}